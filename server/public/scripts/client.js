console.log('client.js is sourced!');
let operator;

// Operator function to collect what operator the user wants to use
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
        url: '/calculations',
        data: equation
    }).then((response) => {
        console.log("Sent POST request at /calculations", response);
        getHistory();
        getRecentResult();
    })

    // Clear the form fields
    document.getElementById("firstNum").value = '';
    document.getElementById("secondNum").value = '';
}

function getHistory(){
    console.log("Inside getHistory");
    axios({
        method: 'GET',
        url: '/calculations'
    }).then((response) => {
        let equations = response.data;
        console.log("Equations result:", equations);
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
    let answerBox = document.getElementById("result");
    answerBox.textContent = result;
}

getHistory();