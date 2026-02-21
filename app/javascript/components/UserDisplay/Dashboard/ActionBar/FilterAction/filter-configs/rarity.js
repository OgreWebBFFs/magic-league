export default {
    name: "rarity",
    options: [
        {
            id: "common",
            display: "Common",
            criteria: (card) => (card.rarity ?? "common") === "common",
        },
        {
            id: "uncommon",
            display: "Uncommon",
            criteria: (card) => card.rarity === "uncommon",
        },
        {
            id: "rare",
            display: "Rare",
            criteria: (card) => card.rarity === "rare",
        },
        {
            id: "mythic",
            display: "Mythic",
            criteria: (card) => (card.rarity === "mythic" || card.rarity === "special"),
        },
    ],
};
