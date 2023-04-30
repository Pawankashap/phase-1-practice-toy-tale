//const { create } = require("jsdom/lib/jsdom/living/generated/Blob");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {
    // hide & seek with the form
    e.preventDefault()
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      fetchToy()
    } else {
       if(document.getElementsByTagName('input')[0].value!=="" || document.getElementsByTagName('input')[1].value!==""){
        addNewToy()
       }
      toyFormContainer.style.display = "none";
    }
  });
});

function addNewToy(e){
  return fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      // "name": "Jessie",
      // "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "name": document.getElementsByTagName('input')[0].value,
      "image": document.getElementsByTagName('input')[1].value ,      
      "likes": 0
    })
  })
  .then(res=> res.json())
  .then(fetch=> console.log(fetch)) 
 
}


function fetchToy() {
  return fetch('http://localhost:3000/toys')
  .then(res=> res.json())
  .then(fetch=> fetchaddToy(fetch)) 
}

function fetchaddToy(toys){
  toys.forEach(toy => {
      let collection = document.getElementById('toy-collection')
      let divobj= document.createElement('div')
      let h2obj = document.createElement('h2')
      let imgobj = document.createElement('img')
      let pobj = document.createElement('p')
      let buttonobj = document.createElement('button')

      divobj.classList.add('card')
      imgobj.classList.add('toy-avatar')
      buttonobj.classList.add('like-btn')

      h2obj.innerHTML = toy.name
      imgobj.setAttribute('src',toy.image)
      pobj.textContent=toy.likes
      buttonobj.setAttribute('id', toy.id)
      buttonobj.textContent='Like ❤️'

      collection.appendChild(divobj)
      divobj.appendChild(h2obj)
      divobj.appendChild(imgobj)
      divobj.appendChild(pobj)
      divobj.appendChild(buttonobj)
  });
  updatelikes()
}

function updatelikes () {
  let likeValues= document.getElementsByClassName('like-btn')
  for (const like of likeValues) {
    like.addEventListener('click', function onClick(e) {
      console.log(e.target.id)
      getLikeValue(e.target.id)
    });
  
  
  }
}
function getLikeValue(id) {
  return fetch(`http://localhost:3000/toys/${id}`)
  .then(res=> res.json())
  .then(detail=>  setLikeValue(detail.id,detail.likes))
  
}

function setLikeValue (id,likes){
  return fetch(`http://localhost:3000/toys/${id}`,{
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    ,
    body: JSON.stringify({
      "likes": likes+1
    })
  })
  .then(res=> res.json())
  .then(detail=> console.log(detail)  )
}
