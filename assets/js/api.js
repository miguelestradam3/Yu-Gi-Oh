async function searchCardsAPI(options = {}) {

    // Support string argument for backward compatibility
    if (typeof options === "string") {
        options = { name: options };
    }

    const {
        name = "",
        type = "",
        attribute = "",
        race = "",
        level = "",
        sort = "name",
        num = 72,
        offset = 0
    } = options;

    const queryParams = new URLSearchParams();

    const trimmedName = (name || "").trim();
    if (trimmedName) {
        queryParams.set("fname", trimmedName);
    }

    if (type) {
        if (type === "Monster") {
            queryParams.set(
                "type",
                "Normal Monster,Effect Monster,Synchro Monster,XYZ Monster,Fusion Monster,Ritual Monster,Link Monster,Pendulum Effect Monster,Pendulum Normal Monster"
            );
        } else {
            queryParams.set("type", type);
        }
    }

    if (attribute) {
        queryParams.set("attribute", attribute);
    }

    if (race) {
        queryParams.set("race", race);
    }

    if (level) {
        queryParams.set("level", level);
    }

    if (sort) {
        // Supported API sort fields: name, atk, def, type, level, id, new
        queryParams.set("sort", sort);
    }

    // Set page batch size for smooth global browsing
    queryParams.set("num", num);
    queryParams.set("offset", offset);

    try {
        const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryParams.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("YGOPRODeck API error:", error);
        return [];
    }

}