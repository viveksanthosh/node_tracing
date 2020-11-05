const cls = require('cls-hooked');
const md5 = require('md5')

const nsid = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
const ns = cls.createNamespace(nsid); //namespace

const middleware = (req, res, next) => {
    ns.run(() => {
        const transactionId = md5(Math.random());
        set('transactionId', transactionId)
        set(config.apiTransactionMeta.CACHE_STATUS, config.cacheStatusCodes.MISS)
        next()
    });
}

function get(key) {
    if (ns && ns.active) {
        return ns.get(key);
    } else {
        //console.log('ns get miss')
    }
}

function set(key, value) {

    if (ns && ns.active) {
        return ns.set(key, value);
    } else {
        //console.log('ns set miss')
    }
}


const ExpressHttpContextMiddleware = {
    middleware,
    get,
    set,
    ns,
}

module.exports = ExpressHttpContextMiddleware;