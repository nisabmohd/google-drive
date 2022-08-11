const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileid: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    filetype: {
        type: String
    },
    storage: {
        type: String,
        required: true
    },
    uid: {
        type: String
    }
})

export const FileModel = new mongoose.model('Files', FileSchema)