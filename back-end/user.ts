import mongoose, { mongo, Schema } from "mongoose"
import * as plmongo from "passport-local-mongoose"

const SchemaInit: Schema = new Schema({
    id: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: false,
        unique: true
    },
    profileImage: {
        type: String,
        required: false,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false,
        unique: true
    }
})

SchemaInit.plugin(plmongo)

const UserModel = mongoose.model("user", SchemaInit)

export { UserModel }