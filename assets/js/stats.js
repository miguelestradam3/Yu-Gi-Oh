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
        <p><strong>Total:</strong> ${deck.length}</p>
        <p><strong>Monsters:</strong> ${monsters}</p>
        <p><strong>Spells:</strong> ${spells}</p>
        <p><strong>Traps:</strong> ${traps}</p>
        <hr>
        <p><strong>Avg ATK:</strong> ${avgAtk}</p>
        <p><strong>Avg DEF:</strong> ${avgDef}</p>
    `;

}