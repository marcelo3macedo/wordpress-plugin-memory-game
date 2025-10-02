document.addEventListener("DOMContentLoaded", () => {
    const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"];
    let playerName = "";
    let hits = 0;
    let mistakes = 0;
    let time = 0;
    let flippedCards = [];
    let lockBoard = false;
    let timerInterval;
  
    const startButton = document.getElementById("start-button");
    const nameInput = document.getElementById("player-name");
    const playerDisplay = document.getElementById("player-display");
    const gameScreen = document.querySelector(".game-screen");
    const startScreen = document.querySelector(".start-screen");
    const resultScreen = document.querySelector(".result-screen");
    const grid = document.getElementById("grid");
    const timerEl = document.getElementById("timer");
    const hitsEl = document.getElementById("hits");
    const mistakesEl = document.getElementById("mistakes");
    const finalHits = document.getElementById("final-hits");
    const finalMistakes = document.getElementById("final-mistakes");
    const finalTime = document.getElementById("final-time");
    const finalScore = document.getElementById("final-score");
  
    startButton.addEventListener("click", () => {
      playerName = nameInput.value.trim();
      if (!playerName) return alert("Digite seu nome!");
      startScreen.classList.add("hidden");
      gameScreen.classList.remove("hidden");
      playerDisplay.textContent = `👤 Jogador: ${playerName}`;
      startGame();
    });
  
    function startGame() {
      const allImages = [...images, ...images];
      allImages.sort(() => Math.random() - 0.5);
      grid.innerHTML = "";
  
      allImages.forEach((img, idx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.image = img;
  
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back" style="background-image: url('${getImagePath(img)}');"></div>
          </div>
        `;
  
        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
      });
  
      timerInterval = setInterval(() => {
        time++;
        timerEl.textContent = `${time}s`;
      }, 1000);
    }
  
    function flipCard(card) {
      if (lockBoard || card.classList.contains("flipped")) return;
      card.classList.add("flipped");
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        lockBoard = true;
        checkMatch();
      }
    }
  
    function checkMatch() {
      const [c1, c2] = flippedCards;
      const isMatch = c1.dataset.image === c2.dataset.image;
  
      if (isMatch) {
        hits++;
        hitsEl.textContent = hits;
        c1.classList.add("correct");
        c2.classList.add("correct");
        flippedCards = [];
        lockBoard = false;
        if (hits === 6) endGame();
      } else {
        mistakes++;
        mistakesEl.textContent = mistakes;
        setTimeout(() => {
          c1.classList.remove("flipped");
          c2.classList.remove("flipped");
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  
    function endGame() {
      clearInterval(timerInterval);
      gameScreen.classList.add("hidden");
      resultScreen.classList.remove("hidden");
  
      finalHits.textContent = hits;
      finalMistakes.textContent = mistakes;
      finalTime.textContent = `${time}s`;
  
      const score = Math.max(0, (hits * 10) - (mistakes * 2) - time);
      finalScore.textContent = score;
    }
  
    function getImagePath(filename) {
      return `${window.location.origin}/wp-content/plugins/jogo-da-memoria/assets/${filename}`;
    }
  });
  