//-----FONCTIONS-----//

function shuffleChildren(parent){
    let children = parent.children
    let i = children.length, k, temp
    
    while(--i > 0){ // tant que i - 1 est > 0

        // k stock un nombre aléatoire baasé sur i
        k = Math.floor(Math.random() * (i + 1))

        // temp pointe temporairement l'élément à la position k dans board
        temp = board.children[k]

        // remplace l'élément à la position k par l'élément à la position i
        board.children[k] = board.children[i]

        // place l'élément k pointé temporairement à la fin du contenu de board
        board.appendChild(temp)
    }
}


//let i = board.children.length, k, temp
//-----  -----//

const box = document.createElement("div")
box.classList.add("box")

const board = document.querySelector("#board")
// board.appendChild(box)
// box.innerText = 1

// création de 10 box grâce à une boucle for

let nb = 1
for(let i = 1; i <= 10; i++){
    let newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    newbox.addEventListener("click", function(){
        
        if(i == nb){
            // console.log("Boite n°"+ i +", click !")
            newbox.classList.add("box-clicked")
            
            //1
            if(nb == board.children.length){
                alert("VICTOIRE !")
                board.querySelectorAll(".box-clicked").forEach(function(validBox){
                    validBox.classList.remove("box-clicked")
                })
            }
            nb++
        }
        // 2
        else if(i > nb){
            alert("Erreur, recommencez !")
            nb = 1
            board.querySelectorAll(".box-clicked").forEach(function(validBox){
                validBox.classList.remove("box-clicked")
            })
        }
        //3
        else{
            alert("Case déjà cliquée !")
        }
    })
}



//-----AFFICHAGE-----//

shuffleChildren(board)