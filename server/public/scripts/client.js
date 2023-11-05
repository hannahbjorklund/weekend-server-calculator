console.log('client.js is sourced!');
let operator;

// STRETCH: This function updates the display of the calculator
function display(event, input){
    event.preventDefault;
    document.getElementById("result").value += input;
    // Make a cute little clicky noise
    let snd = new Audio("ButtonPlate Click (Minecraft Sound) - Sound effect for editing.mp3");
    snd.play();
}

// Operator function to collect what operator the user wants to use (NOT USING THIS IN STRETCH)
function getOperator(event, clickedOperator){
    event.preventDefault();
    operator = clickedOperator;
}

// This function takes the user data from the form and formats it as an object to send to the server in a POST request
function makeEquation(event){
    console.log("Inside makeEquation");
    // Prevent submit from refreshing the page
    event.preventDefault();
    // Store form fields into variables
    let expression = document.getElementById("result").value;
    console.log("User submitted data:", expression);
    
    let operator;
    let fields;

    // Parse the expression for the firstNum, secondNum, and operator
    if(expression.indexOf('+') > -1){
        console.log("Operator is plus");
        operator = '+';
        // We can split the expression string at the operator. Anything before the operator is
        //  the first number. Anything after is the second number
        fields = expression.split('+');
    } else if(expression.indexOf('-') > -1){
        operator = '-';
        fields = expression.split('-');
    } else if(expression.indexOf('*') > -1){
        operator = '*';
        fields = expression.split('*');
    } else if(expression.indexOf('/') > -1){
        operator = '/';
        fields = expression.split('/');
    }

    // Making sure our numbers are actually numbers and not strings!
    let firstNum = Number(fields[0]);
    let secondNum = Number(fields[1]);

    // Creating an equation object that we will send to the server
    let equation = {
        firstNum: firstNum,
        operator: operator,
        secondNum: secondNum
    };
    console.log("Created an equation object", equation);

    // Create a post route to send the equation object to the server
    axios({
        method: 'POST',
        url: '/calculations',
        data: equation
    }).then((response) => {
        console.log("Sent POST request at /calculations", response);
        getHistory();
        getRecentResult();
    })

    // Clear the form fields
    document.getElementById("result").value  = '';
}

function getHistory(){
    console.log("Inside getHistory");
    axios({
        method: 'GET',
        url: '/calculations'
    }).then((response) => {
        let equations = response.data;
        console.log("Received equations:", equations);
        renderEquations(equations);
    })
}

function getRecentResult(){
    console.log("Inside getRecentResult");
    axios({
        method: 'GET',
        url: '/calculations'
    }).then((response) => {
        let equations = response.data;
        let result = equations[equations.length-1].result
        console.log("Equations result:", result );
        renderResult(result);
    })
}

// Log the equations history in the DOM
function renderEquations(equations){
    // Get the html element where we will display our equation history
    console.log("Inside renderEquations", equations);
    let resultHistory = document.getElementById("resultHistory");
    resultHistory.innerHTML = '';
    for(let equation of equations){
        resultHistory.innerHTML += 
        `
        <li>
            ${equation.firstNum} ${equation.operator} ${equation.secondNum} = ${equation.result}
        </li>
        `
    }
}

// Render the most recent result
function renderResult(result){
    let answerBox = document.getElementById("recentResult");
    answerBox.textContent = result;
    let snd = new Audio("Minecraft Level Up Sound Effect.mp3");
    snd.play();
}

getHistory();