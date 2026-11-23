const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
const attributeFilter = document.getElementById("attributeFilter");
const raceFilter = document.getElementById("raceFilter");
const levelFilter = document.getElementById("levelFilter");
const sortFilter = document.getElementById("sortFilter");
const orderFilter = document.getElementById("orderFilter");
const clearSearchBtn = document.getElementById("clearSearch");
const resetFiltersBtn = document.getElementById("resetFilters");
const statusContainer = document.getElementById("status");
const cardsContainer = document.getElementById("cards");

let searchDebounceTimeout;

async function fetchAndDisplayCards() {
    const name = searchInput ? searchInput.value.trim() : "";
    const type = typeFilter ? typeFilter.value : "";
    const attribute = attributeFilter ? attributeFilter.value : "";
    const race = raceFilter ? raceFilter.value : "";
    const level = levelFilter ? levelFilter.value : "";
    const sortBy = sortFilter ? sortFilter.value : "name";
    const sortOrder = orderFilter ? orderFilter.value : "asc";

    if (statusContainer) {
        statusContainer.innerHTML = `
            <div class="d-flex align-items-center justify-content-center gap-2 py-3">
                <div class="spinner-border spinner-border-sm text-warning" role="status"></div>
                <span class="text-secondary small">Searching cards in the official database...</span>
            </div>
        `;
    }

    const cards = await searchCardsAPI({
        name,
        type,
        attribute,
        race,
        level,
        sort: sortBy
    });

    if (!cards || cards.length === 0) {
        if (statusContainer) {
            statusContainer.innerHTML = `
                <div class="alert alert-dark border-secondary text-secondary py-2 small my-2">
                    <i class="bi bi-info-circle me-1 text-warning"></i>
                    No cards found matching your criteria. Try adjusting the search or filters.
                </div>
            `;
        }
        if (cardsContainer) cardsContainer.innerHTML = "";
        const pagination = document.getElementById("pagination");
        if (pagination) pagination.innerHTML = "";
        return;
    }

    if (statusContainer) {
        const isGlobal = !name && !type && !attribute && !race && !level;
        statusContainer.innerHTML = `
            <div class="text-secondary small my-2">
                ${isGlobal ? `<i class="bi bi-globe me-1 text-warning"></i> <strong>Global Search:</strong> Loaded` : `<i class="bi bi-check2-circle me-1 text-success"></i> Found`} 
                <strong class="text-light">${cards.length}</strong> cards
                ${name ? `matching "<span class="text-warning">${name}</span>"` : ''}
                <span class="text-secondary opacity-75">(Sorted by ${sortBy.toUpperCase()} &bull; ${sortOrder === "asc" ? "Ascending" : "Descending"})</span>
            </div>
        `;
    }

    displayCards(cards, sortBy, sortOrder);
}

// Live debounced search input
if (searchInput) {
    searchInput.addEventListener("input", function() {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
            fetchAndDisplayCards();
        }, 350);
    });
}

// Clear search input button
if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function() {
        if (searchInput) {
            searchInput.value = "";
            fetchAndDisplayCards();
        }
    });
}

// Filter listeners: trigger dynamic API query
[typeFilter, attributeFilter, raceFilter, levelFilter, sortFilter].forEach(el => {
    if (el) {
        el.addEventListener("change", () => fetchAndDisplayCards());
    }
});

// Sort order direction listener
if (orderFilter) {
    orderFilter.addEventListener("change", () => {
        const sortBy = sortFilter ? sortFilter.value : "name";
        const sortOrder = orderFilter.value;
        if (typeof currentCards !== "undefined" && currentCards.length > 0) {
            displayCards(currentCards, sortBy, sortOrder);
        } else {
            fetchAndDisplayCards();
        }
    });
}

// Reset filters button
if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function() {
        if (searchInput) searchInput.value = "";
        if (typeFilter) typeFilter.value = "";
        if (attributeFilter) attributeFilter.value = "";
        if (raceFilter) raceFilter.value = "";
        if (levelFilter) levelFilter.value = "";
        if (sortFilter) sortFilter.value = "name";
        if (orderFilter) orderFilter.value = "asc";
        fetchAndDisplayCards();
    });
}

// Perform initial global search on load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchAndDisplayCards);
} else {
    fetchAndDisplayCards();
}
