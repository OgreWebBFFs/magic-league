export default (card, owners) => ({
  id: card.id,
    attributes: {
      name: card.name,
      users: {
        data: owners.map(owner => ({attributes: owner}))
      }
    }
});