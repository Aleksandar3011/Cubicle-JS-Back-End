const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 120,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^http/,
            message: 'Image url should be a link'
        },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
