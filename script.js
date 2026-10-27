let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let expenseForm = document.getElementById("expenseForm");
let titleInput = document.getElementById("title");
let amountInput = document.getElementById("amount");
let categoryInput = document.getElementById("category");
let dateInput = document.getElementById("date");
let expenseList = document.getElementById("expenseList");
let totalExpense = document.getElementById("totalExpense");
// Save expenses in localStorage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
// Display expenses and calculate total
function displayExpenses() {
    expenseList.innerHTML = "";
    let total = 0;
    if (expenses.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No expenses added yet.";
        row.appendChild(cell);
        expenseList.appendChild(row);
    }
    expenses.forEach(function(expense) {
        let row = document.createElement("tr");

        let titleCell = document.createElement("td");
        titleCell.textContent = expense.title;

        let amountCell = document.createElement("td");
        amountCell.textContent = "Rs. " + expense.amount;

        let categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        let dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        let actionCell = document.createElement("td");
        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });
            saveExpenses();
            displayExpenses();
        });
        actionCell.appendChild(deleteBtn);
        row.appendChild(titleCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);
        
        expenseList.appendChild(row);
        total = total + Number(expense.amount);
    });
    totalExpense.textContent = total.toLocaleString("en-PK", {
        maximumFractionDigits: 2
    });
}
// Add a new expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let title = titleInput.value.trim();
    let amount = Number(amountInput.value);
    let category = categoryInput.value;
    let date = dateInput.value;
    if (title === "" || amount <= 0 || !category || !date) {
        alert("Please enter valid expense details.");
        return;
    }
    let expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category,
        date: date
    };
    expenses.push(expense);
    saveExpenses();
    displayExpenses();
    expenseForm.reset();
    alert("Expense added successfully!");
});
// Display saved expenses when page loads
displayExpenses();