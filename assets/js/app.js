const input = document.getElementById("search");
const container = document.getElementById("cards");
const status = document.getElementById("status");

let timeout;

status.innerHTML = `
<div class="alert alert-info">
Type at least 3 characters...
</div>
`;

input.addEventListener("keyup", function(){

    clearTimeout(timeout);

    const value = this.value.trim();

    if(value.length < 3){

        container.innerHTML = "";
        return;
    }

    timeout = setTimeout(async () => {

        status.innerHTML = `<div class="spinner-border"></div>`;

        const cards = await searchCardsAPI(value);

        status.innerHTML = "";

        displayCards(cards);

    },300);

});