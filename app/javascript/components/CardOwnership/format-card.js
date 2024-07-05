export default (card, ownerships) => ({
  id: card.id,
  attributes: {
    name: card.name,
    users: {
      data: ownerships.map((o) => ({ attributes: o.collection.user })),
    },
  },
});
