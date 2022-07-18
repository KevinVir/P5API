// Récupération de l'ID items où les produits de l'API vont être injectés
let items = document.querySelector('#items');

// Récupération de l'API
let url = "http://localhost:3000/api/products";

// Appel de l'API grâche à fetch
fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (value) {
        for (let i = 0; i < value.length; i++) {
            let valueI = value[i]
            items.innerHTML +=
                `<a href="./product.html?id=${valueI._id}">
                    <article>
                        <img src="${valueI.imageUrl}" alt="${valueI.altTxt}">
                            <h3 class="productName">${valueI.name}</h3>
                                <p class="productDescription">${valueI.description}</p>
                    </article>
                </a>`
        };
    })
    .catch(function (err) {
        alert('Une erreur est survenue')
        console.log(err);
    });