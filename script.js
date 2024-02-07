const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const list = document.getElementById("transactionsList");
const form = document.getElementById("addTransactionForm");
const balanceDisplay = document.getElementById("totalBalance");
const incomeDisplay = document.getElementById("totalIncome");
const expenseDisplay = document.getElementById("totalExpense");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  signDisplay: "auto",
});
                                                                                                                                                  // Vibhu
form.addEventListener("submit", addTransaction);

function updateTotals() {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {                                                                                                      // Vibhu
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  balanceDisplay.textContent = formatter.format(balance);
  incomeDisplay.textContent = formatter.format(totals.income);
  expenseDisplay.textContent = formatter.format(totals.expense);                                                          // Vibhu
}

function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach((transaction) => {
    const transactionElement = document.createElement("li");
    transactionElement.classList.add(transaction.type);
    transactionElement.innerHTML = `
      <span>${transaction.name}</span>                                                                                        
      <span>${formatter.format(transaction.amount)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${
        transaction.id
      })">X</button>
    `;
    list.appendChild(transactionElement);
  });
}

function addTransaction(e) {
  e.preventDefault();
  const name = document.getElementById("transactionName").value;
  const amount = parseFloat(document.getElementById("transactionAmount").value);
  const type = document.getElementById("transactionType").value;
  const date = document.getElementById("transactionDate").value;

  transactions.push({
    id: Date.now(),
    name,
    amount,
    type,
    date,
  });

  updateTotals();
  renderTransactions();
  saveTransactions();

  form.reset();
}

function deleteTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index > -1) {
    transactions.splice(index, 1);
    updateTotals();
    renderTransactions();
    saveTransactions();
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

updateTotals();
renderTransactions();
