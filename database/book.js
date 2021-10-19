const mongoose= require("mongoose");

// Creating book schema
const BookSchema = mongoose.Schema({
    ISBN:  String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;