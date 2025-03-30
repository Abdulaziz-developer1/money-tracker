const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addTransactionButton = document.getElementById("addTransaction");
const transactionList = document.getElementById("transactionList");
const totalAmount = document.getElementById("totalAmount");

let transactions = getFromLocalStorage("transactions");

function formatAmount(amount) {
    return Number(amount).toLocaleString("en-US");
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function renderTransactions() {
    transactionList.innerHTML = "";
    let total = 0;

    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.description} - ${formatAmount(transaction.amount)} 000 UZS
            <span>${formatDate(transaction.date)}</span>
            <button onclick="deleteTransaction(${index})">X</button>
        `;
        transactionList.appendChild(li);
        total += transaction.amount;
    });

    totalAmount.textContent = formatAmount(total);
}

function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseInt(amountInput.value);

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        description,
        amount,
        date: new Date().toISOString()
    };
    transactions.push(transaction);
    saveToLocalStorage("transactions", transactions);
    renderTransactions();

    descriptionInput.value = "";
    amountInput.value = "";
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveToLocalStorage("transactions", transactions);
    renderTransactions();
}

addTransactionButton.addEventListener("click", addTransaction);
renderTransactions();

function renderTransactions() {
    transactionList.innerHTML = "";
    let total = 0;

    // Sorting by newest first
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    let lastDate = "";

    transactions.forEach((transaction, index) => {
        const transactionDate = formatDate(transaction.date).split(",")[0]; // Extract only the date part

        // If the date changes, insert an h1 header
        if (transactionDate !== lastDate) {
            const dateHeader = document.createElement("h1");
            dateHeader.textContent = transactionDate;
            transactionList.appendChild(dateHeader);
            lastDate = transactionDate;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.description} - ${formatAmount(transaction.amount)} 000 UZS
            <button onclick="deleteTransaction(${index})">X</button>
        `;
        transactionList.appendChild(li);
        total += transaction.amount;
    });

    totalAmount.textContent = formatAmount(total);
}
