const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect("mongodb://localhost:27017/relation");
}

const orderSchema = new Schema({
    item : String,
    price: Number,
});

const customerSchema = new Schema({
    name:String,
    order:[
        {
            type: Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
})


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async()=>{
    let cust1 = new Customer(
        {
            name : "Alisha Gurung",
        });

        let order1 = await Order.findOne({item:"Chips"});
        let order2 = await Order.findOne({item:"Chocolate"});

        cust1.order.push(order1);
        cust1.order.push(order2);

        let result = await cust1.save();
        console.log(result);
};
addCustomer();

const addOrders = async()=>{
   let res= await Order.insertMany([
    {item: "Somosa", price:15},
    {item: "Chips", price:50},
    {item:"Chocolate", price:320}
    ]);
    console.log(res)
}
addOrders();