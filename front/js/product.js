// Récupération de l'ID de chaque produit grâche à la méthode URLSearchParams

const url_id = window.location.search;
const params = new URLSearchParams(url_id);
const id = params.get('id');

console.log(id);

// Récupération des éléments du HTML pour pouvoir les relier aux produits (titre, prix etc...)

let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let itemsImg = document.querySelector('.item__img');
let colorSelect = document.getElementById('colors');

// Appel de l'API avec fetch suivi de l'id du produit cliqué

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
            itemsImg.innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}"></img>`;

        // On parcours avec une boucle la valeur des couleurs de chaque produit

        for (let color of value.colors) {
            let colors = document.createElement('option');
            colorSelect.appendChild(colors);
            colors.value = color,
                colors.innerHTML = color
        }

        // On crée une variable addCart qui écoutera l'évènement du clique sur le bouton "Ajouter au panier"

        let addCart = document.getElementById('addToCart');
        let quantity = document.getElementById('quantity');

        addCart.addEventListener('click', function () {

            let addProducts = {                        // On prend les valeurs que l'on veut garder au clique du bouton "Ajouter au panier"
                nomProduit: value.name,
                Quantité: quantity.value,
                Couleur: colorSelect.value,
                Prix: value.price,
                imageProduit: value.imageUrl
            }

            let dataStorage = JSON.parse(localStorage.getItem('Products'))
            console.log(dataStorage);

            if (dataStorage) {
                dataStorage.push(addProducts)
                localStorage.setItem('Products', JSON.stringify(dataStorage))

            } else {
                dataStorage = []
                dataStorage.push(addProducts)
                localStorage.setItem('Products', JSON.stringify(dataStorage))
                console.log(dataStorage)
            }
        })
    })

    .catch(function (err) {
        alert('Une erreur est survenue')
        console.log(err);
    });