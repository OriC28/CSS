// Elements
const buttonSubmit = document.getElementById("add-transaction");
const form = document.getElementById("form");
const totalBalance = document.getElementById("balance");
const transactionContainer = document.querySelector(".transactions-container");
const incomeText = document.querySelector("#income-text");
const expenseText = document.querySelector("#expense-text");

// Add class "column"
transactionContainer.classList.add("column");

const handleSubmit = (e) => {
  e.preventDefault();
  const description = e.target.description.value;
  const amount = e.target.amount.value;
  const transaction = { description: description, amount: amount };
  addTransaction(transaction);
  renderTransactions();
  form.reset();
};

const calculateIncomeAndExpense = (transactions) => {
  let incomes = parseFloat(window.localStorage.getItem("incomes"));
  let expenses = parseFloat(window.localStorage.getItem("expenses"));

  transactions?.forEach((transaction) => {
    const amountParsed = parseFloat(transaction.amount);
    incomes += amountParsed > 0 ? amountParsed : 0;
    expenses += amountParsed < 0 ? amountParsed : 0;
  });
  window.localStorage.setItem("incomes", JSON.stringify(incomes));
  window.localStorage.setItem("expenses", JSON.stringify(expenses));
};

const initIncomeAndExpense = () => {
  window.localStorage.setItem("incomes", JSON.stringify(0));
  window.localStorage.setItem("expenses", JSON.stringify(0));
};

const addTransaction = (transaction) => {
  const transactions =
    JSON.parse(window.localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  window.localStorage.setItem("transactions", JSON.stringify(transactions));
  deleteMessage();
};

const renderTransactions = () => {
  const transactions = JSON.parse(window.localStorage.getItem("transactions"));
  initIncomeAndExpense();
  calculateIncomeAndExpense(transactions);
  setBalance();
  deleteContent(transactions);
  transactions?.forEach((item) => {
    const transaction = document.createElement("div");
    transaction.classList.add("transaction");
    changeColorTransaction(transaction, item.amount);
    transaction.innerHTML = `
            <span>${item.description}</span>
            <span>${item.amount}</span>`;
    transactionContainer.appendChild(transaction);
  });
};

const changeColorTransaction = (transaction, amount) => {
  amount < 0
    ? (transaction.style.borderRightColor = "#cf3b3b")
    : (transaction.style.borderRightColor = "#379719");
};

const setBalance = () => {
  let incomes = parseFloat(window.localStorage.getItem("incomes"));
  let expenses = parseFloat(window.localStorage.getItem("expenses"));
  totalBalance.textContent = "$" + `${incomes + expenses}`;
  incomeText.textContent = "$" + `${incomes}`;
  expenseText.textContent = "$" + `${expenses}`;
};

const deleteContent = (transactions) => {
  transactionContainer.innerHTML = "";
  transactionContainer.innerHTML =
    transactions === null
      ? `<p>There's not transactions</p>
           <button id="close-modal" onclick="dialog.close()">Cerrar</button>`
      : `<button id="close-modal" onclick="dialog.close()">Cerrar</button>`;
};

const deleteMessage = () => {
  const contentContainer = transactionContainer.children;
  if (contentContainer[0].localName === "p") contentContainer[0].remove();
};

form.addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", renderTransactions);
console.log(
  window.localStorage.getItem("incomes"),
  window.localStorage.getItem("expenses")
);
