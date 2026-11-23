function updateDeckStatistics(){

    const deck = getDeck();

    const statsContainer = document.getElementById("statsContainer");
    const stats = document.getElementById("deckStats");

    if(deck.length === 0){
        statsContainer.style.display = "none";
        return;
    }

    statsContainer.style.display = "block";

    const monsters = deck.filter(c => c.type.includes("Monster")).length;
    const spells = deck.filter(c => c.type.includes("Spell")).length;
    const traps = deck.filter(c => c.type.includes("Trap")).length;

    const atkCards = deck.filter(c => c.atk !== undefined);
    const defCards = deck.filter(c => c.def !== undefined);

    const avgAtk = atkCards.length
        ? Math.round(atkCards.reduce((a,c) => a + c.atk,0) / atkCards.length)
        : 0;

    const avgDef = defCards.length
        ? Math.round(defCards.reduce((a,c) => a + c.def,0) / defCards.length)
        : 0;

    stats.innerHTML = `
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-2 text-center">
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Total</div>
                    <div class="fs-5 fw-bold text-white">${deck.length}</div>
                </div>
            </div>
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Monsters</div>
                    <div class="fs-5 fw-bold text-warning">${monsters}</div>
                </div>
            </div>
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Spells</div>
                    <div class="fs-5 fw-bold text-success">${spells}</div>
                </div>
            </div>
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Traps</div>
                    <div class="fs-5 fw-bold text-danger">${traps}</div>
                </div>
            </div>
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Avg ATK</div>
                    <div class="fs-5 fw-bold text-info">${avgAtk}</div>
                </div>
            </div>
            <div class="col">
                <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary">
                    <div class="text-secondary small">Avg DEF</div>
                    <div class="fs-5 fw-bold text-light">${avgDef}</div>
                </div>
            </div>
        </div>
    `;

}