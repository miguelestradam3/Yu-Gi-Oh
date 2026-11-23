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
        <div class="d-flex align-items-center justify-content-center flex-wrap gap-2">
            <button class="btn"
                onclick="prevPage()"
                ${currentPage === 1 ? "disabled" : ""}>
                <i class="bi bi-chevron-left me-1"></i> Previous
            </button>

            <span class="px-3 py-1 rounded bg-dark border border-secondary text-white small">
                Page ${currentPage} / ${totalPages}
            </span>

            <button class="btn"
                onclick="nextPage()"
                ${currentPage === totalPages ? "disabled" : ""}>
                Next <i class="bi bi-chevron-right ms-1"></i>
            </button>
        </div>
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
        <div class="col-12 col-md-6 col-lg-4">

            <div class="card yugioh-card shadow h-100 d-flex flex-column justify-content-between">

                <div>
                    <img src="${card.card_images[0].image_url}" class="card-img-top" alt="${card.name}">

                    <div class="card-body pb-0">

                        <h5 class="fs-6 fw-bold mb-2 text-truncate" title="${card.name}">${card.id} - ${card.name}</h5>

                        <p class="card-desc text-light opacity-75 mb-2">${card.desc}</p>

                        ${card.atk !== undefined ? `
                        <p class="mb-1 small">
                            <strong>ATK:</strong> ${card.atk}
                            &nbsp;&nbsp;
                            <strong>DEF:</strong> ${card.def}
                        </p>
                        ` : ""}

                        ${card.race !== undefined ? `
                        <p class="mb-1 small"><strong>RACE:</strong> ${card.race ?? "-"}</p>
                        ` : ""}

                        ${card.attribute ? `
                        <p class="mb-2">
                            <span class="badge" style="background:${getAttributeColor(card.attribute)} !important">
                                Attribute: ${card.attribute}
                            </span>
                        </p>
                        ` : ""}
                    </div>
                </div>

                <div class="p-3 pt-0">
                    <button class="btn w-100"
                        onclick="addCard(${card.id})">
                        <i class="bi bi-plus-circle me-1"></i> Add to Deck
                    </button>
                </div>

            </div>

        </div>
        `;

    });

    renderPagination(cards);

}

function renderDeck(animatedCardId = null, isDuplicate = false){

    const deckContainer = document.getElementById("deck");
    const deckCount = document.getElementById("deckCount");

    deckContainer.innerHTML = "";

    const currentDeck = getDeck();

    // Group identical cards together
    const grouped = [];
    const map = new Map();

    currentDeck.forEach(card => {
        if (!map.has(card.id)) {
            const item = { card: card, count: 1 };
            map.set(card.id, item);
            grouped.push(item);
        } else {
            map.get(card.id).count++;
        }
    });

    grouped.forEach(({ card, count }) => {
        const shouldAnimate = isDuplicate && animatedCardId === card.id && count > 1;

        deckContainer.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">

            <div class="card yugioh-card shadow h-100 d-flex flex-column justify-content-between position-relative ${shouldAnimate ? 'duplicate-animated' : ''}" id="deck-card-${card.id}">

                ${shouldAnimate ? `<div class="copy-float-flare">+1 Copy</div>` : ''}

                ${count > 1 ? `
                <span class="card-copy-badge">x${count}</span>
                ` : ''}

                <div>
                    <img src="${card.card_images[0].image_url}" class="card-img-top" alt="${card.name}">

                    <div class="card-body text-center p-2">

                        <h6 class="text-truncate small mb-0" title="${card.name}">${card.name}</h6>

                    </div>
                </div>

                <div class="p-2 pt-0 text-center">
                    <div class="d-flex align-items-center justify-content-center gap-1">
                        <button class="btn btn-sm btn-danger flex-grow-1" style="background-color: #dc3545 !important;"
                            onclick="removeCard(${card.id})" title="Remove one copy">
                            <i class="bi bi-dash-circle me-1"></i> Remove
                        </button>
                        ${count < 3 ? `
                        <button class="btn btn-sm btn-warning" style="background-color: var(--accent-color) !important;"
                            onclick="addCard(${card.id})" title="Add another copy">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                        ` : ''}
                    </div>
                </div>

            </div>

        </div>
        `;

    });

    if (isDuplicate && animatedCardId) {
        setTimeout(() => {
            const el = document.getElementById(`deck-card-${animatedCardId}`);
            if (el) {
                el.classList.remove("duplicate-animated");
                const flare = el.querySelector(".copy-float-flare");
                if (flare) flare.remove();
            }
        }, 1200);
    }

    deckCount.textContent = currentDeck.length;

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