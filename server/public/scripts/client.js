console.log('client.js is sourced!');

let operator;

// Operator function to collect what operator the user wants to use
function getOperator(event, clickedOperator){
    event.preventDefault();
    operator = clickedOperator;
}

// This function takes the user data from the form and formats it as an object to send to the server in a POST request
function makeEquation(event){
    console.log("Inside makeEquation", event);
    // Prevent submit from refreshing the page
    event.preventDefault();
    // Store form fields into variables
    let firstNum = document.getElementById("firstNum").valueAsNumber;
    let secondNum = document.getElementById("secondNum").valueAsNumber;
    console.log("User submitted data:", firstNum, secondNum, operator);

    // Create an equation object that we will send to the server
    let equation = {
        firstNum: firstNum,
        operator: operator,
        secondNum: secondNum
    };
    console.log("Created an equation object", equation);

    // Create a post route to the server
    axios({
        method: 'POST',
        url: '/equation',
        data: equation
    }).then((response) => {
        console.log("Sent POST request at /equation", response);
        // We received a response from the server! Storing the new equation data in a variable
        let newEquation = response.data;
        //renderEquation(newEquation);
    })

    // Clear the form fields
    document.getElementById("firstNum").value = '';
    document.getElementById("secondNum").value = '';
    getResult()
}