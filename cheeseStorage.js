// cheeseStorage.js
const cheeseNames = [];

module.exports = {
    getCheeseNames: () => [...cheeseNames],
    addCheese: (cheeseName) => {
        cheeseNames.push(cheeseName);
    },
};