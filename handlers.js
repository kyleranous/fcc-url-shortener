// Handler Definitions
// Dependencies
const dns = require('dns');
const url = require('url');

const { createAndSaveUrl } = require('./models');
const { findUrlById } = require('./models');

const shorturlPostRequest = (req, res) => {
    // Validate the URL
    let hostname;
    try {
        hostname = new url.URL(req.body.url).hostname;
    } catch (err) {
        // If there is an error parsing the hostname, return an error
        res.json({ error: 'invalid url' });
        return;
    }
    console.log(hostname);
    // Check if the URL is valid
    dns.lookup(hostname, (err) => {
        if (err) {
            // If not return an error
            res.json({ error: 'invalid url' });
            return;
        }
        else {
            // Save the URL and Return The ID
            createAndSaveUrl(req.body.url, (err, data) => {
                if (err) {
                    res.json({ error: 'database error' });
                    return;
                }
                console.log(data);
                res.json({ original_url: req.body.url, short_url: data });
            });
        }
    });  
};

const shorturlRedirect = (req, res) => {
    // Find the URL by the ID
    console.log("Here I am");
    findUrlById(req.params.id, (err, data) => {
        if (err) {
            console.log("Error 1");
            res.json({ error: 'database error' });
            return;
        }
        // Redirect to the URL
        res.redirect(data.originalUrl);
    });
};

module.exports = {
    shorturlPostRequest,
    shorturlRedirect,
  };