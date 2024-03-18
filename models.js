require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: { type: String, required: true }
});

const Url = mongoose.model('Url', urlSchema);

// Add a URL to the database
const createAndSaveUrl = (originalUrl, done) => {
    var url = new Url({ originalUrl: originalUrl });
    url.save((err, data) => {
        if (err) return console.error(err);
        done(null, data._id);
    });
};

// Find a URL from the database by ID
const findUrlById = (id, done) => {
    console.log(id);
    Url.findById(id, (err, data) => {
        if (err) return done(err);
        done(null, data);
    });
};

module.exports.createAndSaveUrl = createAndSaveUrl;
module.exports.findUrlById = findUrlById;