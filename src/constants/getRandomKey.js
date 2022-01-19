let listOfKeys = [];
const getRandomKey = () => {
  const randomKey = Math.floor(Math.random() * 1000000);
  if (listOfKeys.includes(randomKey)) {
    return getRandomKey();
  } else {
    listOfKeys.push(randomKey);
    return randomKey;
  }
};

export default getRandomKey;
