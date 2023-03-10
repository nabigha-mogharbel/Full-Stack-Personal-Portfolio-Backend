import mongoose from "mongoose";
const {Schema , model} = mongoose

const linkSchema = new Schema ({

    name : {
        type:String,
        required:true,
    },
    link : {
        type:String,
        require:true,
    },
    icon : {
        type:String,
        require:true,
    },
}, {collection: "links"})

const Link = model("Link",linkSchema)
export default Link