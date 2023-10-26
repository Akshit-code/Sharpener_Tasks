const expenses = {
    amount: document.getElementById("amount"),
    desc: document.getElementById("desc"),
    category: document.getElementById("category"),
};

document.getElementById("submit").addEventListener("click", display_exp);
document.addEventListener("DOMContentLoaded", loadExpenses);

function display_exp() {
    const li = document.createElement("li");
    const amount_text = document.createTextNode("Amount: " + expenses.amount.value);
    const desc_text = document.createTextNode("Description: " + expenses.desc.value);
    const category_text = document.createTextNode("Category: " + expenses.category.value);

    const edit_btn = document.createElement("button");
    edit_btn.innerHTML = "Edit";
    edit_btn.addEventListener("click", function () {
        edit_exp(li);
    });

    const delete_btn = document.createElement("button");
    delete_btn.innerHTML = "Delete";
    delete_btn.addEventListener("click", function () {
        delete_exp(li);
    });

    li.appendChild(amount_text);
    li.appendChild(desc_text);
    li.appendChild(category_text);
    li.appendChild(edit_btn);
    li.appendChild(delete_btn);

    document.getElementById("display_list").appendChild(li);

    saveExpense(expenses.amount.value, expenses.desc.value, expenses.category.value);

    expenses.amount.value = "";
    expenses.desc.value = "";
    expenses.category.value = "";
}

function delete_exp(li) {
    if (li) {
        li.remove();
        removeExpense(li);
    }
}

function edit_exp(li) {
    if (li) {
        const amountText = li.querySelector("li:nth-child(1)").textContent;
        const descText = li.querySelector("li:nth-child(2)").textContent;
      
        const amountValue = parseFloat(amountText.substring(8));

        // Populate the input fields with the extracted information
        document.getElementById("amount").value = amountValue; // Set as a number or an empty string
        document.getElementById("desc").value = descText.substring(12);

        li.remove();
        removeExpense(li);
    }
}

function saveExpense(amount, desc, category) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ amount, desc, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeExpense(li) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const amountText = li.querySelector("li:nth-child(1)").textContent;
    const descText = li.querySelector("li:nth-child(2)").textContent;
    const categoryText = li.querySelector("li:nth-child(3)").textContent;
    const expenseToRemove = { amount: amountText.substring(8), desc: descText.substring(12), category: categoryText.substring(9) };
    const updatedExpenses = expenses.filter(expense => JSON.stringify(expense) !== JSON.stringify(expenseToRemove));
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const displayList = document.getElementById('display_list');
    displayList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement("li");
        const amount_text = document.createTextNode("Amount: " + expense.amount);
        const desc_text = document.createTextNode("Description: " + expense.desc);
        const category_text = document.createTextNode("Category: " + expense.category);

        const edit_btn = document.createElement("button");
        edit_btn.innerHTML = "Edit";
        edit_btn.addEventListener("click", function () {
            edit_exp(li);
        });

        const delete_btn = document.createElement("button");
        delete_btn.innerHTML = "Delete";
        delete_btn.addEventListener("click", function () {
            delete_exp(li);
        });

        li.appendChild(amount_text);
        li.appendChild(desc_text);
        li.appendChild(category_text);
        li.appendChild(edit_btn);
        li.appendChild(delete_btn);

        displayList.appendChild(li);
    });
}
