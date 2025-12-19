import mongoose, { mongo } from "mongoose";

const applicationScehma = mongoose.Schema({

user:{

    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
},
job:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
},
resume:{

    type:String,
    required:true,
},
status:{

    type: String,
    enum:["applied","reviewed","rejected"],
    default: "applied",
},

},

    {timestamps: true}
);

const Application = mongoose.model("Application", applicationScehma);
export default Application;