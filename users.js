const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect("mongodb://localhost:27017/relation");
}

const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id:false,
            location: String,
            city: String,
        }
    ]
})

const User = mongoose.model("User", userSchema)

const addUsers = async () => {
    let user1 = new User({
        username: "Nishan Kumar Rai",
        addresses: [
            {
            location: "Chitwan",
            city: "Bharatpur"
        },
    ],
    });
    user1.addresses.push({ location: "Narayanghat", city: "Bharatpur" })
    let result = await user1.save();
    console.log(result)
}
addUsers();