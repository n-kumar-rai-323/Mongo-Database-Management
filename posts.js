const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect("mongodb://localhost:27017/relation");
}

const userSchema = new Schema({
    username : String,
    email:String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async()=>{
//     let user =await User.findOne({username: "nepalibabu"});


//     let post2 = new Post({
//         content: "Bye Bye",
//         likes:70,
//     })

//     post2.user = user;
    
//     await post2.save();
// };
// addData()

const getData = async()=>{
    // let result = await Post.findOne({}).populate("user");
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
}
getData();