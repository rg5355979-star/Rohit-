## Setup Instructions

### 1. Install Required Software

VS Code, Node JS, Git Bash

- VS Code Tutorial : https://youtu.be/3eCmc0t6aqA?si=TkV0bVEz_95FbMmi

- Node Js Tutorial: https://youtu.be/uCgAuOYpJd0?si=2ICwr3Ih1P_ru9KA

- Git Bash Tutorial : https://www.youtube.com/watch?v=t2-l3WvWvqg


### 2. Open the Project

1. Open the "christmas-special" folder in VS Code

2. Open terminal in VS Code (Terminal → New Terminal)

4. Type this command and press Enter:
   npm i

   after that, type this command: 

   npm run dev

   **If you get a script error on Windows, run this :**

   Set-ExecutionPolicy -Scope CurrentUser Unrestricted

   after that, try again the commands

5. You'll get a local view link
6. Ctrl + Click on the localhost link to view your website!

## 🌐 How to Share Your Website
Watch my tutorial: https://youtu.be/bFCnDsQwNvA



## 🎨 Customization Guide

### 📝 How to Change Main Content

Go to src folder. 
edit the text inside of textConfig.js file only!

## How to change Music 
Go to src folder. Go to music folder. 
paste your new music there.
delete previous musics.
update your music names as music1.mp3, music2.mp3, music3.mp3

## How to change Images
Go to src folder. Go to imgs folder. 
paste your new image there.
delete previous iamges.
update your music names as pic1.jpg, pic2.jpg, pic3.jpg


## How to change Music Cover Images
Go to src folder. Go to imgs folder. 
paste your new image there.
delete previous iamges.
update your music names as music1.jpg, music2.jpg, music3.jpg



## 🆘 Common Issues & Solutions

### ❌ "Cannot find module" errors
Solution: Run `npm install` to install all dependencies

### ❌ Images not loading
Solutions:
1. Make sure images are in `src/imgs/` folder
2. Check the import paths match your file names
3. Supported formats: `.jpg`, `.png`, `.gif`

### ❌ Music not playing
Solutions:
1. Check if your music file is in the `src/music/` folder
2. File size should be under 10MB

### ❌ Changes not showing
Solutions:
1. Save your files (Ctrl+S)
2. Hard refresh browser (Ctrl+Shift+R) or (CTRL + F5)