module.exports = {
    getItemFromLocalStorage: () => {
        window.getItemFromLocalStorage = (name) => window.localStorage.getItem(name);
    }
}