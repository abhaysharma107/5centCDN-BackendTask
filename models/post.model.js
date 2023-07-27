const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: {    
        type: String,
        required: "This field is required."
    },
    userId: {
        type: String,
        required: "This field is required."
    },
});

mongoose.model("Post", postSchema);