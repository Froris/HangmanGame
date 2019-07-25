import getPuzzle from "./requests";
import Hangman from "./hangman";

const puzzleEl = document.querySelector("#puzzleField");
const guessesEl = document.querySelector("#guesses");
const resButton = document.querySelector("#reset");
const startButton = document.querySelector("#start");
const difficultyButton = document.querySelector("#difficulty");

let game1;
let difficulty;

// Создание слов
const createPuzzle = async(wordCount, trysCount) => {
    let puzzle = await getPuzzle(wordCount);
    game1 = new Hangman(puzzle, trysCount);
    render();   
}

// Создание игры с уровнем сложности
const newGame = () => {
    switch(difficulty){
        case undefined:
            puzzleEl.textContent = "Choose difficulty first!";
            break;
        case "easy":
            createPuzzle("1", 6);
            break;
        case "normal":
            createPuzzle("2", 14);
            break;
        case "hard":
            createPuzzle("3", 24);
            break;
    }
}

// Вывод слова на экран
const render = () => {
    puzzleEl.innerHTML = "";
    guessesEl.textContent = game1.statusMessage;

    game1.puzzle.split("").forEach((el) => {
        const span = document.createElement("span");
        span.classList.add("letter");
        span.textContent = el;
        if(span.textContent !== "*"){
            span.classList.add("letter--guessed");
        }
        puzzleEl.appendChild(span);
    })
}

// Отгадывание нажатием клавиш
window.addEventListener("keypress", (e) => {
    const guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    render();
})

// Установка уровеня сложности
difficultyButton.addEventListener("change", (e) => {
    switch(e.target.value){
        case "easy":
            difficulty = "easy";
            break;
        case "normal":
            difficulty = "normal";
            break;
        case "hard":
            difficulty = "hard";
            break;
    }
    startButton.disabled = false;
});

// Старт игры
startButton.addEventListener("click", (e) => {
    newGame();
    if(difficulty !== undefined){
       e.target.disabled = true; 
    }
    e.target.blur();
});

// Сброс игры
resButton.addEventListener("click", (e) => {
    difficulty = undefined;
    difficultyButton.value = "empty";
    startButton.disabled = false;
    guessesEl.textContent = "";
    newGame();
});

