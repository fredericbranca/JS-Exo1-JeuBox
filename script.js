
//La méthode querySelector() de l'objet document permet de pointer le premier élément répondant à la requête spécifiée dans l'argument sous forme de chaîne de caractères.
//On veut atteindre la list (ul)
let list = document.querySelector("ul")

//On veut récupérer tous les éléments de la liste (li)
let listElements = list.querySelectorAll("li")

//console.log() liste les composantes d'objet JS (comme l'inspecteur d'éléments du navigateur)
// console.log("la liste", list)
// console.log("les éléments", listElements)

//boucle sur la NodeList "listElements" pour ici changer la couleur du texte de chaque li en rouge
listElements.forEach(function(element){
    console.dir(element) //permet de consulter la propriété d'un élément du DOM
    element.style.color = "red"
})

