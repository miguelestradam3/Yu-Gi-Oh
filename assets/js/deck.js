const deck = [];
let currentCards = [];

function addCard(cardId){

    let card = currentCards.find(c => c.id === cardId);
    if(!card){
        card = deck.find(c => c.id === cardId);
    }
    if(!card) return;

    const copies = deck.filter(c => c.id === card.id);

    if(copies.length >= 3){
        Swal.fire({
            icon: "warning",
            title: "Limit Reached!",
            text: `Maximum of 3 copies allowed for "${card.name}".`,
            timer: 1800,
            showConfirmButton: false
        });
        return;
    }

    const isDuplicate = copies.length > 0;
    deck.push(card);

    renderDeck(card.id, isDuplicate);
}

function removeCard(identifier){
    const lastIndex = deck.map(c => c.id).lastIndexOf(identifier);
    if (lastIndex !== -1) {
        deck.splice(lastIndex, 1);
    } else if (typeof identifier === "number" && identifier < deck.length) {
        deck.splice(identifier, 1);
    }
    renderDeck();
}

function getDeck(){
    return deck;
}

function setCurrentCards(cards){
    currentCards = cards;
}

function downloadDeck() {

    const data = JSON.stringify(getDeck(), null, 2);

    const blob = new Blob([data], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "deck.json";

    a.click();

    URL.revokeObjectURL(url);

    Swal.fire({
        icon: "success",
        title: "Excellent!",
        text: "Downloaded your deck",
        timer: 1200,
        showConfirmButton: false
    });

}

function uploadDeck() {

    const fileInput = document.getElementById("deckFile");

    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const uploaded = JSON.parse(event.target.result);

            deck.length = 0;
            deck.push(...uploaded);

            renderDeck();

            Swal.fire({
                icon: "success",
                title: "Uploaded your deck!",
                text: "Excellent!",
                timer: 1200,
                showConfirmButton: false
            });

        } catch (e) {

            Swal.fire({
                icon: "error",
                title: "File does not work!",
                text: `Invalid deck file`,
                timer: 1800,
                showConfirmButton: false
            });

        }

    };

    reader.readAsText(file);
}