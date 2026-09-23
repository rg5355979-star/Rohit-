const SECRET_CODE = "1402";

const screens = [...document.querySelectorAll(".screen")];
const show = id => {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
};

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => show(btn.dataset.next));
});

// Password keypad
let entered = "";
const keypad = document.getElementById("keypad");
const dots = document.getElementById("codeDots");
for(let i=1;i<=9;i++) addKey(String(i));
addKey("0");
const back = document.createElement("button");
back.className = "key back"; back.textContent = "⌫";
back.onclick = () => { entered = entered.slice(0,-1); renderDots(); };
keypad.appendChild(back);

function addKey(n){
  const b=document.createElement("button");
  b.className="key"; b.textContent=n;
  b.onclick=()=>press(n);
  keypad.appendChild(b);
}
function renderDots(){
  dots.innerHTML="";
  for(let i=0;i<SECRET_CODE.length;i++){
    const d=document.createElement("span");
    d.className="dot"+(i<entered.length?" on":"");
    dots.appendChild(d);
  }
}
function press(n){
  if(entered.length>=SECRET_CODE.length) return;
  entered += n; renderDots();
  if(entered.length===SECRET_CODE.length){
    setTimeout(()=>{
      if(entered===SECRET_CODE){ show("welcome"); entered=""; renderDots(); }
      else{
        document.querySelector(".lock-card").animate(
          [{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],
          {duration:300}
        );
        entered=""; renderDots();
      }
    },180);
  }
}
renderDots();

// Photo puzzle: uses the outdoor couple photo and starts shuffled.
const grid = document.getElementById("puzzleGrid");
const swapCount = document.getElementById("swapCount");
const puzzleNext = document.getElementById("puzzleNext");
let order = [...Array(9).keys()];
let selected = null, swaps = 0;
const solved = [...Array(9).keys()];

// deterministic scramble with a few swaps so it is always solvable
[[0,4],[1,7],[2,6],[3,8],[5,7]].forEach(([a,b])=>[order[a],order[b]]=[order[b],order[a]]);

function drawPuzzle(){
  grid.innerHTML="";
  order.forEach((piece,pos)=>{
    const tile=document.createElement("button");
    tile.className="tile";
    const x=piece%3, y=Math.floor(piece/3);
    tile.style.backgroundPosition=`${x*50}% ${y*50}%`;
    tile.setAttribute("aria-label",`Puzzle piece ${pos+1}`);
    tile.onclick=()=>selectTile(pos,tile);
    grid.appendChild(tile);
  });
  swapCount.textContent=swaps;
}
function selectTile(pos,tile){
  if(selected===null){
    selected=pos; tile.classList.add("selected"); return;
  }
  if(selected===pos){tile.classList.remove("selected");selected=null;return;}
  [order[selected],order[pos]]=[order[pos],order[selected]];
  swaps++; selected=null; drawPuzzle();
  if(order.every((v,i)=>v===solved[i])) puzzleNext.classList.remove("hidden");
}
drawPuzzle();
puzzleNext.onclick=()=>{startQuiz(); show("quiz")};

// Quiz
const questions=[
  {q:"What comes after H?", a:["K","L","I","J"], c:3},
  {q:"What comes before M?", a:["N","L","K","O"], c:1},
  {q:"What comes after X?", a:["W","V","Y","Z"], c:2},
  {q:"Put your last three answers together. What do they spell?", a:["KMW","ILY","JOV","LNZ"], c:1},
  {q:"Which little word best describes us?", a:["Maybe","Always","Never","Later"], c:1}
];
let qi=0;
function startQuiz(){qi=0; renderQuiz();}
function renderQuiz(){
  const q=questions[qi];
  document.getElementById("question").textContent=q.q;
  document.getElementById("questionCount").textContent=`Question ${qi+1} of ${questions.length}`;
  const answers=document.getElementById("answers"); answers.innerHTML="";
  q.a.forEach((text,i)=>{
    const b=document.createElement("button"); b.className="answer"; b.textContent=text;
    b.onclick=()=>{
      [...answers.children].forEach(x=>x.disabled=true);
      if(i===q.c){
        b.classList.add("correct");
        setTimeout(()=>{
          qi++;
          if(qi>=questions.length) show("complete"); else renderQuiz();
        },500);
      }else{
        b.classList.add("wrong");
        setTimeout(()=>{b.classList.remove("wrong"); [...answers.children].forEach(x=>x.disabled=false)},450);
      }
    };
    answers.appendChild(b);
  });
  document.getElementById("progress").textContent="♥ ".repeat(Math.min(qi+1,5)).trim();
}
document.getElementById("relive").onclick=()=>{show("lock")};
