const defaults = {
    axiosConfig: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000
    },
    urls: {
        mainURL: "https://www.amocrm.ru",
        amojoURL: "https://amojo.amocrm.ru"
    }
};

module.exports = defaults;