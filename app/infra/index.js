const PhotoDao = require('./photo-dao')
    , UserDao = require('./user-dao')
    , wrapAsync = require('./async-wrap')
    , auth = require('./auth');

    module.exports = {
        PhotoDao,
        UserDao,
        wrapAsync,
        auth
    };