const {Schema, model} = require('mongoose')

const schema = new Schema ({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
},  {
    timestamps: true
    }
)

module.exports = model('Category', schema)