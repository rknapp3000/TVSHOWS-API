const webPages = require('./webpageroutes');

const constructorMethod = (app) => {
    app.use('/', webPages);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;