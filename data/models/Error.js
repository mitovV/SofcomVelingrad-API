import mongoose from "mongoose"

const { Schema } = mongoose

const errorSchema = new Schema({
    error: {
        type: String,
        require: true
    },
    errorInfor: {
        type: String,
        require: true
    }
})