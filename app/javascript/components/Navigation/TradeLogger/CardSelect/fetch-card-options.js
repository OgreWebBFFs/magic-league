import xhrRequest from "../../../../helpers/xhr-request";

const searchCards = async (query, userId) =>
    (
        await xhrRequest({
            url: `/cards?query=${query}&user=${userId}`,
            options: {
                method: "GET",
            },
        })
    ).data;

const fetchCardOptions = async (inputValue, userId) => {
    const results = await searchCards(inputValue, userId);
    return results.map((card) => ({
        value: `${card.id}#${Date.now()}`,
        label: card.attributes.name,
        card,
        showSet: results.filter((c) => c.attributes.name === card.attributes.name).length > 1,
    }));
};
export default fetchCardOptions;
