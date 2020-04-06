const _ = require('lodash');

const route = (fn, url) => async (req, res) => {
    try {
        let err;
        const reportError = (status, error) => {
            err = { status, error };
        };
        const data = await fn(req, reportError) || { success: true };
        if (err) {
            res.status(err.status).json({ error: err.error });
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(`Error at ${url}`, err);
        res.status(500).end();
    }
};

exports.init = (app, routes) => {
    _.forEach(routes, (handlers, url) => {
        // Create
        if (handlers.post) {
            app.post(url, route(handlers.post, url));
        }
        // Read
        if (handlers.get) {
            app.get(url, route(handlers.get, url));
        }
        // Update
        if (handlers.put) {
            app.put(url, route(handlers.put, url));
        }
        // Delete
        if (handlers.delete) {
            app.delete(url, route(handlers.delete, url));
        }
    });
};
