let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let expenseForm = document.getElementById("expenseForm");
let expenseList = document.getElementById("expenseList");
let totalExpense = document.getElementById("totalExpense");
// Save expenses
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
// Display expenses and calculate total
function displayExpenses() {
    expenseList.innerHTML = "";
    let total = 0;
    if (expenses.length === 0) {
        expenseList.innerHTML = "<tr><td colspan='5'>No expenses added yet.</td></tr>";
    }
    expenses.forEach(function(expense) {
        let row = document.createElement("tr");
        [expense.title, "Rs. " + expense.amount, expense.category, expense.date].forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        let cell = document.createElement("td");
        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-btn";
        btn.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });
            saveExpenses();
            displayExpenses();
        });
        cell.appendChild(btn);
        row.appendChild(cell);
        expenseList.appendChild(row);
        total += Number(expense.amount);
    });
    totalExpense.textContent = total.toLocaleString("en-PK", {
        maximumFractionDigits: 2
    });
}
// Add expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let title = document.getElementById("title").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    if (!title || amount <= 0 || !category || !date) {
        alert("Please enter valid expense details.");
        return;
    }
    expenses.push({
        id: Date.now(), title, amount, category, date
    });
    saveExpenses();
    displayExpenses();
    expenseForm.reset();
    alert("Expense added successfully!");
});
// Show saved expenses
displayExpenses();