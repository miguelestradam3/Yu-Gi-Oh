function displayCards(cards){

    const container = document.getElementById("cards");
    container.innerHTML = "";

    setCurrentCards(cards);

    cards.forEach(card => {

        container.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12">

            <div class="card yugioh-card shadow h-100">

                <img src="${card.card_images[0].image_url}" class="card-img-top">

                <div class="card-body">

                    <h5>${card.name}</h5>

                    <p>${card.desc}</p>

                    <p><strong>ATK:</strong> ${card.atk ?? "-"}</p>
                    <p><strong>DEF:</strong> ${card.def ?? "-"}</p>

                    <hr>

                    <button class="btn btn-primary"
                        onclick="addCard(${card.id})">
                        Add to Deck
                    </button>

                </div>

            </div>

        </div>
        `;

    });

}

function renderDeck(){

    const deckContainer = document.getElementById("deck");
    const deckCount = document.getElementById("deckCount");

    deckContainer.innerHTML = "";

    getDeck().forEach((card,index) => {

        deckContainer.innerHTML += `
        <div class="col-md-3">

            <div class="card yugioh-card shadow h-100">

                <img src="${card.card_images[0].image_url}" class="card-img-top">

                <div class="card-body text-center">

                    <h6>${card.name}</h6>

                    <button class="btn btn-danger btn-sm"
                        onclick="removeCard(${index})">
                        Remove
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    deckCount.textContent = getDeck().length;

    updateDeckStatistics();

}