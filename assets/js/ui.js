let currentPage = 1;
const cardsPerPage = 6;
let filteredCards = [];

function displayCards(cards){

    currentCards = cards;
    currentPage = 1;

    applyFilters();

}

function renderPagination(cards){

    const pagination = document.getElementById("pagination");

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    pagination.innerHTML = "";

    if(totalPages <= 1) return;

    pagination.innerHTML = `
        <button class="btn me-2"
            onclick="prevPage()"
            ${currentPage === 1 ? "disabled" : ""}>
            Previous
        </button>

        <span class="mx-2">
            Page ${currentPage} / ${totalPages}
        </span>

        <button class="btn ms-2"
            onclick="nextPage()"
            ${currentPage === totalPages ? "disabled" : ""}>
            Next
        </button>
    `;
}

function nextPage(){

    currentPage++;

    renderPage();

}

function prevPage(){

    currentPage--;
    
    renderPage();
}

function applyFilters(){

    const selectedType =
        document.getElementById("typeFilter").value;

    const selectedAttribute =
        document.getElementById("attributeFilter").value;

    filteredCards = [...currentCards];

    if(selectedType){

        filteredCards = filteredCards.filter(card =>
            card.type.includes(selectedType)
        );

    }

    if(selectedAttribute){

        filteredCards = filteredCards.filter(card =>
            card.attribute === selectedAttribute
        );

    }

    currentPage = 1;

    renderPage(filteredCards);

}

function renderPage(cards = currentCards){

    const container = document.getElementById("cards");
    container.innerHTML = "";

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const pageItems = cards.slice(start, end);

    pageItems.forEach(card => {

        container.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12">

            <div class="card yugioh-card shadow h-100">

                <img src="${card.card_images[0].image_url}" class="card-img-top">

                <div class="card-body">

                    <h5>${card.id} - ${card.name}</h5>

                    <p>${card.desc}</p>

                    ${card.atk !== undefined ? `
                    <p class="mb-0">
                        <strong>ATK:</strong> ${card.atk}
                        &nbsp;&nbsp;
                        <strong>DEF:</strong> ${card.def}
                    </p>
                    ` : ""}

                    ${card.race !== undefined ? `
                    <p><strong>RACE:</strong> ${card.race ?? "-"}</p>
                    ` : ""}

                    ${card.attribute ? `
                    <p class="mb-1">
                        <span class="badge" style="background:${getAttributeColor(card.attribute)} !important">
                            Attribute: ${card.attribute}
                        </span>
                    </p>
                    ` : ""}

                    <button class="btn"
                        onclick="addCard(${card.id})">
                        Add to Deck
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    renderPagination(cards);

}

function renderDeck(){

    const deckContainer = document.getElementById("deck");
    const deckCount = document.getElementById("deckCount");
    const deck_buttons = document.getElementById("deckContainer");

    if (deckCount.length === 0) {

        deck_buttons.style.display = "none";
        return;

    }

    deck_buttons.style.display = "block";

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

function getAttributeColor(attribute) {

    const colors = {
        "LIGHT": "#FFD700",
        "DARK": "#6F42C1",
        "FIRE": "#E25822",
        "WATER": "#1E90FF",
        "EARTH": "#8B5A2B",
        "WIND": "#2E8B57",
        "DIVINE": "#F4C430"
    };

    return colors[attribute] || "#040000";

}