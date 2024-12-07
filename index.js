const express = require('express');
const app = express();
const cors = require('cors');


const port = 3000;

app.use(cors());


// server-side variables 
const taxRate = 5 // 5%
const memberDiscount = 10; // 10%
const loyalityPoints = 2; // 2 points per $1 spent



//routes

// CART TOTAL
app.get('/cart-total', (req, res) => {
  const newItemPrice =parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  const totalCartPrice = newItemPrice + cartTotal;


  res.send(totalCartPrice.toString());

})


// MEMBERSHIP DISCOUNT
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;

  if(isMember == 'true'){
    const discount = (cartTotal * memberDiscount) / 100;
    const discountedTotal = cartTotal - discount;
    res.send(discountedTotal.toString());
  }else{
    res.send(cartTotal.toString());
  }
  
})

// CALCULATE TAX
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

  const tax = cartTotal * taxRate / 100;

  res.send(tax.toString());

})

// ESTIMATE DELIVERY TIME
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);

  let deliveryTime;

  // standard shipping
  if(shippingMethod === "standard") {
    // math.ceil for upward rounding 
    deliveryTime = Math.ceil(distance / 50)
  // express shipping
  } else if (shippingMethod === "express") {
      deliveryTime = Math.ceil(distance / 100);
  } else {
    res.send("Invalid shipping method");
  }

  res.send(deliveryTime.toString());

})



// SHIPPING COST
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);


  const shippingCost = distance * weight * 0.1;

  res.send(shippingCost.toString());
})

//LOYALITY POINTS
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  const points = purchaseAmount * loyalityPoints;

  res.send(points.toString());

 
})



app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
