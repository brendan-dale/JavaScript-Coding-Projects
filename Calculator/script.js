//keeps track of values
const Calculator = {
  Display_Value: '0',           //displays 0 on the screen
  First_Operand: null,          //will hold the first operand
  Wait_Second_Operand: false,   //checks whether or not the second operand has been input
  operator: null,               //holds the operator
};

// this modifies values each time a button is clicked
function Input_Digit(digit) {
  const { Display_Value, Wait_Second_Operand } = Calculator;
  //checking to see if Wait_Second_Operand is true and set Display
  if (Wait_Second_Operand === true) {
    Calculator.Display_Value = digit;
    Calculator.Wait_Second_Operand = false;
  } else {
    Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit; }
}
// this section handles decimal points
function Input_Decimal(dot) {
  //this makes sure the accidental clicking of the decimal point doesn't cause bugs
  if (Calculator.Wait_Second_Operand === true) return;
  if (!Calculator.Display_Value.includes(dot)) {
    //if the Display_Value does not contain a decimal then we add one
    Calculator.Display_Value += dot;
  }
}

//this section handles operators
function Handle_Operator(Next_Operator) {
  const { First_Operand, Display_Value, operator } = Calculator
  //when an operator key is pressed, convert the current number
  //displayed on the screen to a number and then store the 
const Value_of_Input = parseFloat(Display_Value);
if (operator && Calculator.Wait_Second_Operand) {
  Calculator.operator = Next_Operator;
  return;
}
if (First_Operand == null) {
  Calculator.First_Operand = Value_of_Input;
} else if (operator) {
  const Value_Now = First_Operand || 0;
  const result = Perform_Calculation[operator] (Value_Now, Value_of_Input);

  Calculator.Display_Value = String(result);
  Calculator.First_Operand = result;
}

Calculator.Wait_Second_Operand = true;
Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
  '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,

  '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,

  '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,

  '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,

  '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
  Calculator.Display_Value = '0';
  Calculator.First_Operand = null;
  Calculator.Wait_Second_Operand = false;
  Calculator.operator = null;
}

function Update_Display() {
  const display = document.querySelector('.calculator-screen');
  display.value = Calculator.Display_Value;  
}

Update_Display();
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    Handle_Operator(target.value);
    Update_Display();
    return;
  }

if (target.classList.contains('decimal')) {
    Handle_Operator(target.value);
    Update_Display();
    return;
  }

  if (target.classList.contains('all-clear')) {
    Calculator_Reset();
    Update_Display();
    return;
  }

  Input_Digit(target.value);
  Update_Display();
})