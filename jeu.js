//-----FONCTIONS-----//

function shuffleChildren(parent){
    let children = parent.children
    let i = children.length, k, temp
    // let k 
    // let temp 
    
    while(i-- > 0){ // tant que i - 1 est > 0
        // k stock un nombre aléatoire baasé sur i
        k = Math.floor(Math.random() * (i + 1)) // k = plusGrandEntier<= ( (0 <= nRandom < 1) * (i + 1) )
        // temp pointe temporairement l'élément à la position k dans board
        temp = board.children[k]
        // remplace l'élément à la position k par l'élément à la position i
        board.children[k] = board.children[i]
        // place l'élément k pointé temporairement à la fin du contenu de board
        board.appendChild(temp) // append() permet l'ajout au html
    }
}

function showReaction(type, clickedBox){ 
    clickedBox.classList.add(type)
    if(type !== "success"){
        const timeout = setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800)
    }
}


//let i = board.children.length, k, temp //
//-----  -----//

const box = document.createElement("div") //creér un élément div
box.classList.add("box") //ajouter la classe box à l'élément div

const board = document.querySelector("#board") //cibler le 1er élément correspondant à l'élément board
// board.appendChild(box) //
// box.innerText = 1 //

// création de 10 box grâce à une boucle for

let nb = 1
let nbBox = prompt("Nombre de box?")

for(let i = 1; i <= nbBox; i++){
    const newbox = box.cloneNode() // permet de cloner l'élément div (const box) : ne pas oublier new
    newbox.innerText = i // ajouter le texte à l'élément div
    board.appendChild(newbox) // ajouter l'élément div à l'élément board

    newbox.addEventListener("click", function(){ // création d'un événement click
        
        if(i == nb){
            // console.log("Boite n°"+ i +", click !") //
            newbox.classList.add("box-clicked") // ajouter la classe box-clicked à l'élément div
            
            //1
            if(nb == board.children.length){ // si nb == au nombre de boites en jeu
                // alert("VICTOIRE !") //
                // board.querySelectorAll(".box-clicked").forEach(function(validBox){ //
                    // validBox.classList.remove("box-clicked") //
                board.querySelectorAll(".box").forEach(function(box){ // on récupère tous les éléments div de board qui possède la classe box
                    showReaction("success", box) // on affiche la réaction "success"
                })
            }
            nb++
        }
        // 2
        else if(i > nb){
            // alert("Erreur, recommencez !")
            showReaction("error", newbox) 
            nb = 1
            board.querySelectorAll(".box-clicked").forEach(function(validBox){ // on récupère tous les éléments div de board qui possède la classe box-clicked
                validBox.classList.remove("box-clicked") // supprime la classe box-clicked
            })
            setTimeout(()=>{shuffleChildren(board)}, 800)
        }
        //3
        else{
            // alert("Case déjà cliquée !")
            showReaction("notice", newbox) // on affiche la réaction "notice"
        }
    })
}



//-----AFFICHAGE-----//

shuffleChildren(board)