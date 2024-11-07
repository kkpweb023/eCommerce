const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
require('./DataBase/config');
const port = process.env.PORT || 4000 ;
const Products = require('./DataBase/ProductSchema');
const CartProducts = require('./DataBase/CartSchema');
const PaymentProducts = require('./DataBase/PaymentSchema');
const BankDetails = require('./DataBase/BankSchema');
const UserSchema = require('./DataBase/UserSchema');
const Info = require('./DataBase/InfoSchema');


/*
app.post('/productPost', jsonParser, async (req, res) => {

    let data = new Products({

        id: req.body.id,
        title: req.body.title,
        brand: req.body.brand,
        category: req.body.category,
        rating: req.body.rating,
        stock: req.body.stock,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        deliveryCharge: req.body.deliveryCharge,
        total_amount: req.body.total_amount,
        promoCode: req.body.promoCode,
        inline_remote: req.body.inline_remote,
        impedance: req.body.impedance,
        MinimumFrequencyResponse: req.body.MinimumFrequencyResponse,
        MaximumFrequencyResponse: req.body.MaximumFrequencyResponse,
        DomesticWarranty: req.body.DomesticWarranty,
        WarrantySummary: req.body.WarrantySummary,
        CoveredInWarranty: req.body.CoveredInWarranty,
        thumbnail: req.body.thumbnail,
        images:req.body.images

    })
    let product = await data.save();
    product = product.toObject();
    res.send(product)
}
)
*/

//get product

app.get('/product', async (req, res) => {
    const allData = await Products.find({});
    res.send(allData)
})

//single product details
app.get('/product-details/:id', async (req, res) => {
    const singleData = await Products.findOne({ id: req.params.id })
    res.send(singleData);
})

//select or update color and size
app.put('/productUpdate/:id', jsonParser, async (req, res) => {
    const singleData = await Products.updateOne(
        { id: req.params.id }, { $set: req.body }
    )
    res.send(singleData);
})

//add-cart

app.post('/cartProduct', jsonParser, async (req, res) => {

    const data = new CartProducts({
        id: req.body.id,
        title: req.body.title,
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        deliveryCharge: req.body.deliveryCharge,
        total_amount: req.body.total_amount,
        thumbnail: req.body.thumbnail,
    })
    let cartProduct = await data.save();
    cartProduct = cartProduct.toObject();
    res.send(cartProduct)
})

app.get('/cartlist', async (req, res) => {
    const singleData = await CartProducts.find({})
    res.send(singleData);
})

app.delete(`/deleteCart/:id`, async (req, res) => {
    const deleteData = await CartProducts.deleteOne({ id: req.params.id });
    res.send(deleteData);
})


//select Quantity

app.put('/quantityUpdate/:id', jsonParser, async (req, res) => {
    const singleData = await CartProducts.updateOne(
        { id: req.params.id }, { $set: req.body }
    )
    res.send(singleData);
})

//update price by  update Quantity

app.put('/priceUpdate/:id', jsonParser, async (req, res) => {
    const singleData = await CartProducts.updateOne(
        { id: req.params.id }, { $set: req.body }
    )
    res.send(singleData);
})


//User Bank Details

app.post('/bankdetails',jsonParser,async(req,res)=>{
    const data = new BankDetails({
        _id: Math.floor(Math.random() * 100000000000),
        mode:req.body.mode,
        nameCard:req.body.nameCard,
        cardNumber:req.body.cardNumber,
        expire:req.body.expire,
        cvv:req.body.cvv,  
    })
    let bankDetail = await data.save();
    bankDetail = bankDetail.toObject();
    res.send(bankDetail)
})

app.get('/banklist', async (req, res) => {
    const singleData = await BankDetails.find({})
    res.send(singleData);
})

app.delete('/bankListDelete/:id',async (req,res)=>{
    const singleData = await BankDetails.deleteOne({ _id: req.params.id })
    res.send(singleData);
})


//payment
app.post('/bankCheck', jsonParser, async (req, res) => {

        const bankDetails = await BankDetails.findOne(req.body);
        if (bankDetails) {
            res.send("Payment successful")
        } else {
            res.send("Payment failed")
        } 
})


app.post('/payment', jsonParser, async (req, res) => {


        const data = new PaymentProducts({

            invoiceNumber:req.body.invoiceNumber,
            mode: req.body.mode,
            nameCard: req.body.nameCard,
            total: req.body.total,
            item: req.body.item,
            address: req.body.address,
            gstn: req.body.gstn,
            status:req.body.status,
            date: req.body.date,
            igst:req.body.igst,
            itemtotal:req.body.itemtotal,
            product:req.body.product

        })
        let paymentProduct = await data.save();
        paymentProduct = paymentProduct.toObject();
        res.send(paymentProduct);


})

// payment Slip dowload

app.get('/paymentlist',async (req,res)=>{
const singleData = await PaymentProducts.find()
res.send(singleData);
})

app.delete('/paymentlistDelete/:id',async (req,res)=>{
    const singleData = await PaymentProducts.deleteOne({ _id: req.params.id })
    res.send(singleData);
})

//User Registration


app.post('/register',jsonParser,async(req,res)=>{

       
     if(req.body.name==="" || req.body.email==="" || req.body.password===""){
            res.send("Field Empty")
     }else{
        const user = await UserSchema.findOne({ email: req.body.email });

        if(user){
              res.send("Email already register")
        }else{
            const data = new UserSchema({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            let users = await data.save();
            users = users.toObject();
            delete users.password;
            res.send(users);
        }  
    }       
})


app.post('/login',jsonParser,async(req,res)=>{

    if(req.body.password && req.body.email){
        let user = await UserSchema.findOne(req.body).select('-password');

        if(user){
            res.send(user)
        }else{
           res.send('Please enter correct email and password')
       }
    }else{
         res.send("Please signup")
    }
})


//search id

app.get('/search/:key', async (req, res) => {

    const data = await Products.find({
        '$or': [
            
            { category: { $regex: req.params.key } },
            { title: { $regex: req.params.key } },
            { brand: { $regex: req.params.key } },
            { color: { $regex: req.params.key } },
            { size: { $regex: req.params.key } },
        ]
    });
    res.send(data);
})


//Single view payment Slip dowload

app.get('/paymentlist/:id',async (req,res)=>{
    const singleData = await PaymentProducts.find({ _id:req.params.id })
    res.send(singleData);
})






// for My_School forntend 


app.post('/attendence',jsonParser,async(req,res)=>{

    if(req.body.name==="" || req.body.subject==="" || req.body.remarks===""){
           res.send("Field Empty")
    }else{
           const data = new Info({
               name:req.body.name,
               subject:req.body.subject,
               remarks:req.body.remarks
           })
           let users = await data.save();
           res.send(users);
        
   }       
})


app.get('/info_list', async (req, res) => {

    const data = await Info.find({});

    if(data.length > 0){
        res.send(data)
    }else{
        res.header("Access-Control-Allow-Origin","*")
        res.send([]);
    }
})









app.listen(port, () => {
    console.log(`from port ${port}`)

})