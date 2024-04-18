const AmoClient = require("./src/amoClient");

module.exports = ({
    /**
     * Creates a new AmoClient with optional parameter.
     *
     * @param {ConfigObject} optional - description of parameter {@link ConfigObject}
     * @return {AmoClient} a new AmoClient instance
     */
    createClient: function (optional) {
        return new AmoClient(optional);
    },
    Utils: require("./src/utils"),
})