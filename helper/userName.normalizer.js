module.exports = {
    normalize: (name) => {
        const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        return normalizedName;
    },
};
