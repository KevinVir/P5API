const url_id = window.location.search;
const params = new URLSearchParams(url_id);
const id = params.get('id');

console.log(id);

let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let itemsImg = document.querySelector('.item__img');
let colors = document.querySelector('#colors option value');

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (value) {
        console.log(value)
        title.innerHTML = value.name,
            price.innerHTML = value.price,
            description.innerHTML = value.description,
            itemsImg.innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}"></img>`


    })
    .catch(function (err) {
        alert('Une erreur est survenue')
        console.log(err);
    });