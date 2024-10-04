const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ],
    instructions: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {
        type: String,
        enum: ['Italian', 'Chinese', 'Mexican', 'Indian', 'French', 'Other'],
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Automatically update `updatedAt` before each save operation
recipeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
