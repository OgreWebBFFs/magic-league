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

const fetchCardOptions = async (inputValue, userId) =>
    (await searchCards(inputValue, userId)).map((card) => ({
        value: `${card.id}#${Date.now()}`,
        label: card.attributes.name,
        card,
    }));

export default fetchCardOptions;
