const randomizeOrder = (participants) => {
  const randomized = [...participants];
  let currentIndex = randomized.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [randomized[currentIndex], randomized[randomIndex]] = [
      randomized[randomIndex], randomized[currentIndex]];
  }

  return randomized;
};

export default randomizeOrder;
