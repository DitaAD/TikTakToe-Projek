# Tic Tac Toe with AI-Assisted Development  

## 📖 Project Overview  
This project is a **Tic Tac Toe web application** developed as part of a learning project.  
The goal was not only to create a functional game but also to explore how **AI tools like IBM Granite** can support the development process.  

The application allows two players to play Tic Tac Toe in a browser with score tracking, a reset function, and visual effects for wins.  
AI assistance was used to refine styling, improve code readability, and add visual feedback such as a line appearing over the winning combination.  

---

## 🛠️ Technologies Used  
- **HTML5** → structuring the game board and layout  
- **CSS3** → styling, animations, responsiveness  
- **JavaScript (Vanilla JS)** → game logic, event handling, local storage for scores  
- **LocalStorage API** → persisting scores across sessions  
- **IBM Granite AI** → coding assistance to refine styling, add interactivity, and debug issues (e.g., diagonal win line visualization)  

**Why these technologies?**  
- Simple and lightweight for a browser-based game  
- No backend required, runs directly in the browser  
- AI sped up feature implementation and styling improvements  

---

## 🎮 Features  
- Interactive Tic Tac Toe board (9 clickable cells)  
- Two-player gameplay (X and O alternate turns)  
- Scoreboard with local storage (tracks X wins, O wins, and draws even after refresh)  
- Reset options: reset the board or reset all scores  
- Winning line effect: stripe dynamically drawn across row, column, or diagonal  
- Visual feedback: active and winning cells highlighted  

---

## ⚙️ Setup Instructions  

1. Clone the repository:  
   ```bash
   git clone https://github.com/DitaAD/TikTakToe-Projek.git
2. Open the project folder in VS Code (or any editor).
3. Run by simply opening index.html in your browser.
4. (Optional) Deploy using GitHub Pages / Netlify / Vercel for online access.

## 🤖 AI Support Explanation
AI support was integrated in the development workflow, not directly in the game logic.
I used IBM Granite to:
- Suggest CSS improvements (transitions, highlight effects, active cell backgrounds).
- Implement the winning line animation, including fixing diagonal calculations with getBoundingClientRect.
- Improve code readability by restructuring functions (updateBoard, renderScores, highlightLine).
- Provide UX ideas like smoother transitions and clearer player feedback.

Impact of AI usage:
- Faster debugging (especially diagonal win logic).
- More engaging design and user experience.
- Better understanding of clean coding practices through AI examples.

## 📸 Screenshots
Game board example (X wins with a diagonal line):
<img width="1918" height="902" alt="Screenshot 2025-09-09 181945" src="https://github.com/user-attachments/assets/688ba61c-4bc8-4439-87fe-c12ae0c90362" />
