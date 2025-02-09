document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables for budget and expenses
    let budget = parseFloat(localStorage.getItem('budget')) || 0;
    let expenses = parseFloat(localStorage.getItem('expenses')) || 0;

    // Get references to the HTML elements
    const budgetInput = document.getElementById('budgetInput');
    const expenseInput = document.getElementById('expenseInput');
    const setBudgetBtn = document.getElementById('setBudgetBtn');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const remainingText = document.getElementById('remainingText');
    const spentText = document.getElementById('spentText');

    // Function to update the displayed values and save to localStorage
    function updateDisplay() {
        remainingText.textContent = `Remaining Budget: $${budget - expenses}`;
        spentText.textContent = `Total Expenses: $${expenses}`;
        localStorage.setItem('budget', budget);
        localStorage.setItem('expenses', expenses);
    }

    // Load initial values on page load
    updateDisplay();

    // Function to set the budget
    setBudgetBtn.addEventListener('click', function () {
        const budgetValue = parseFloat(budgetInput.value);
        if (!isNaN(budgetValue) && budgetValue > 0) {
            budget = budgetValue;
            expenses = 0; // Reset expenses when a new budget is set
            updateDisplay();
        }
    });

    // Function to add an expense
    addExpenseBtn.addEventListener('click', function () {
        const expenseValue = parseFloat(expenseInput.value);
        if (!isNaN(expenseValue) && expenseValue > 0 && (budget - expenses) >= expenseValue) {
            expenses += expenseValue;
            updateDisplay();
        } else {
            alert("Invalid expense or not enough budget!");
        }
    });

    // Function to reset everything
    resetBtn.addEventListener('click', function () {
        budget = 0;
        expenses = 0;
        localStorage.clear();
        updateDisplay();
    });
});