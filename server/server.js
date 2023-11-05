const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:
// GET /calculations
app.get('/calculations', (req, res) => {
  console.log("GET /calculations received a request");
  res.send(calculations);
})

// POST /calculations
app.post('/calculations', (req, res) => {
  console.log("Received a POST request:");
  // Receive the data from the client (an equation object)
  let calculation = req.body;
  // Give the calculation a new result property using the calculate function
  calculation.result = calculate(calculation.firstNum, calculation.secondNum, calculation.operator);
  console.log(calculation);
  // Add the new calculation to our array of calculations
  calculations.push(calculation);
  // Tell the client we did the thing
  res.sendStatus(201);
})

// Making a function that calculates the equation result
function calculate(firstNum, secondNum, operator){
  if(operator === '+'){
      return firstNum+secondNum;
  } else if(operator === '-'){
      return firstNum-secondNum;
  } else if(operator === '*'){
      return firstNum*secondNum;
  } else {
      return firstNum/secondNum;
  }
}

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
