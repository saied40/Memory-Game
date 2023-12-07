let right = 0;
let wrong = 0;

let popupCont = document.querySelector(".popup.start");

start.addEventListener("click", _ => {
  let userName = window.prompt("What's Your Name ?");
  if(userName === "") { userName = "Unknown" }
  username.textContent = userName
  popupCont.remove();
});

const allCards = Array.from(document.querySelectorAll(".card"));
var option1 = undefined;
var firstCard = undefined;

allCards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.add("flipped");
    if (option1 == undefined) {
      // save first option to a variabal
      firstCard = this;
      option1 = this.children[1].children[0].getAttribute("data-img");
    } else {
      if (option1 == this.children[1].children[0].getAttribute("data-img")) {
        // right answer
        right += 1;
        rightCont.innerHTML = right;
        if(right == 10) { result(true) }
      } else {
        // wrong answer
        wrong += 1;
        wrongCont.innerHTML = wrong;
        window.setTimeout(() => {
          this.classList.add("noFlipped")
          firstCard.classList.add("noFlipped")
        }, 1000)
        window.setTimeout(() => {
          this.classList.remove("flipped");
          this.classList.remove("noFlipped");
          firstCard.classList.remove("flipped");
          firstCard.classList.remove("noFlipped");
          // console.log(this)
        }, 1500);
        if(wrong == 5) { result(false) }
      }
      option1 = undefined;
    }
    // console.log(`img-data: ${this.children[1].children[0].getAttribute("data-img")}; Right Answers: ${right}; Wrong Answers: ${wrong}; option 1 : ${option1}`)
  });
});

// if (wrong === 3) {
//   result(false);
// }

// if (right === 20) {
//   result(true);
// }

function shufleCards(cards=[]) {
  let num1 = cards.length;
  for (let i = 0; i < cards.length; i++) {
    const e = cards[i];
    e.style.cssText = `order: ${Math.floor(Math.random() * num1)}`;
    num1 -= 1;
  }
}
shufleCards(allCards)

function result(state=true|false) {
  let popCont = document.createElement("div")
  popCont.classList.add("popup-cont")
  let mainCont = document.createElement("div")
  mainCont.classList.add("popup")
  popCont.appendChild(mainCont)
  if(state === true) {
    mainCont.classList.add("right")
    mainCont.append("You have Pased all Curectlly")
  } else {
    mainCont.classList.add("wrong")
    mainCont.append("Game Over")
  }
  var btnsCont = document.createElement("div")
  btnsCont.classList.add("btns")
  var btnPlay = document.createElement("button")
  btnPlay.classList.add("play")
  btnPlay.append("Play Again")
  btnPlay.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.remove();
    rightCont.innerHTML = right = 0;
    wrongCont.innerHTML = wrong = 0;
    allCards.forEach(card => {
      card.classList.remove("flipped", "noFlipped")
    })
    shufleCards(allCards)
  });
  var btnOut = document.createElement("button")
  btnOut.classList.add("out")
  btnOut.addEventListener("click", _ => window.close() )

  btnOut.append("Get Out")
  mainCont.appendChild(btnsCont)
  btnsCont.appendChild(btnPlay)
  btnsCont.appendChild(btnOut)

  document.body.appendChild(popCont)

  // allCards.addEventListener("click", _ => null)
}
