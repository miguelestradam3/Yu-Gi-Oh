let currentPage = 1;
const cardsPerPage = 6;

function displayCards(cards){

    currentCards = cards;
    currentPage = 1;

    renderPage();

}

function renderPagination(){

    const pagination = document.getElementById("pagination");

    const totalPages = Math.ceil(currentCards.length / cardsPerPage);

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

function renderPage(){

    const container = document.getElementById("cards");
    container.innerHTML = "";

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const pageItems = currentCards.slice(start, end);

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

    renderPagination();

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