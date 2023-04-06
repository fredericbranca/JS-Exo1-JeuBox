// Supprimer toutes les données de sessionStorage si actualise
sessionStorage.clear();

//--------------------------------------------------FONCTIONS-------------------------------------------------------//

function resetBox() {
  stopReset(); //stop le chrono
  //supprime le board
  const elementBox = document.getElementById("board");
  elementBox.remove();

  //création nouveau board
  let div = document.createElement("div");
  div.id = "board";
  //référence noeud parent
  let parentDiv = document.getElementById("timer").parentNode;
  let d = document.getElementById("timer");
  //inset la div avant la div id=timer
  parentDiv.insertBefore(div, d);

  //lancement des box
  createBox(n);
  shuffleChildren(board);
}

//création de 10 box grâce à une boucle for
function createBox(nb) {

  document.getElementById("timer").textContent = "Temps actuel : 00:00" ;

  const box = document.createElement("div"); //creér un élément div
  box.classList.add("box"); //ajouter la classe box à l'élément div
  const board = document.querySelector("#board"); //cibler le 1er élément correspondant à l'élément board

  for (let i = 1; i <= nbBox; i++) {
    const newbox = box.cloneNode(); // permet de cloner l'élément div (const box) : ne pas oublier new
    newbox.innerText = i; // ajouter le texte à l'élément div
    board.appendChild(newbox); // ajouter l'élément div à l'élément board

    newbox.addEventListener("click", function () {
      // création d'un événement click

      if (i == nb) {
        if (nb == 1) {
          start();
        }

        newbox.classList.add("box-clicked"); // ajouter la classe box-clicked à l'élément div
        if (i < nbBox) {
          shuffleChildren(board);
        }

        if (nb == board.children.length) {
          board.querySelectorAll(".box").forEach(function (box) {
            showReaction("success", box); // on affiche la réaction "success"
          });

          stop(); //stop le chrono
        }

        nb++;
      } else if (i > nb) {
        showReaction("error", newbox);
        nb = 1;
        stopReset();

        board.querySelectorAll(".box-clicked").forEach(function (validBox) {
          validBox.classList.remove("box-clicked"); // supprime la classe box-clicked
        });

        setTimeout(() => {
          shuffleChildren(board);
        }, 800);
      } else {
        showReaction("notice", newbox); // on affiche la réaction "notice"
      }
    });
  }
}

//------fonction pour mélanger les box-----//
function shuffleChildren(parent) {
  let children = parent.children;
  let i = children.length, k, temp;

  while (i-- > 0) {
    k = Math.floor(Math.random() * (i + 1)); // k = plusGrandEntier<= ( (0 <= nRandom < 1) * (i + 1) )
    temp = board.children[k]; // temp pointe temporairement l'élément à la position k dans board
    board.children[k] = board.children[i]; // remplace l'élément à la position k par l'élément à la position i
    board.appendChild(temp); // append() permet l'ajout au html // place l'élément k pointé temporairement à la fin du contenu de board
  }
}

//-----fonction pour changer la couleur des box-----//
function showReaction(type, clickedBox) {
  clickedBox.classList.add(type);
  if (type !== "success") {
    setTimeout(function () {
      clickedBox.classList.remove(type);
    }, 800);
  }
}

//----- TIMER -----//

function start() {
  startTime = new Date().getTime();
  interval = setInterval(affichageChrono, 10);
}
function stop() {
  clearInterval(interval);

  // si le temps écoulé est inférieur au record actuel, on met à jour le record
  if (chrono < currentRecord) {
    currentRecord = chrono;
    // console.log(currentRecord);
    sessionStorage.setItem("record", currentRecord); // on stocke le nouveau record dans la session actuelle
  }

  // affichage du record actuel
  document.getElementById("record").innerHTML = "Record actuel : " + convertTime(currentRecord);
}
function stopReset() {
  clearInterval(interval);
}

function affichageChrono() {
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var timeStr = convertTime(elapsedTime);
  document.getElementById("timer").textContent = "Temps actuel : " + timeStr;
  chrono = elapsedTime;
}

// fonction pour formater le temps en millisecondes en string "ss:mm"
function convertTime(ms) {
  var seconds = Math.floor(ms / 1000);
  var milliseconds = ms % 1000;
  var secondsStr = seconds < 10 ? "0" + seconds : seconds;
  var millisecondsStr = ("00" + milliseconds).slice(-2);
  return secondsStr + ":" + millisecondsStr;
}

//--------------------------------------------------Affichage/Variables-------------------------------------------------------//

//Variables Timer
var interval;
var startTime = 0;
var chrono;
var currentRecord = sessionStorage.getItem("record") || Infinity; // on récupère le record stocké dans la session actuelle
// document.getElementById("record").innerHTML = "Record actuel : " + convertTime(currentRecord);

// variable boucle box
let n = 1;
let nbBox = prompt("Nombre de box?");

//création des box
createBox(n);
//mélange des box
shuffleChildren(board);

//recommencer
var recommencer = document.getElementById("recommencer");
recommencer.addEventListener("click", resetBox);
