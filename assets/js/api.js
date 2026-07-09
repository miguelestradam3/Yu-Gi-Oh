async function searchCardsAPI(name) {

    const response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(name)}`
    );

    const data = await response.json();

    return data.data;

}

/*
async function searchTypesAPI(type) {

    const response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=${encodeURIComponent(type)}`
    );
    const data = await response.json();

    return data.data;

}
*/