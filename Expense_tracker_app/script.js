const input = {
    amount: document.getElementById("amount"),
    desc : document.getElementById("desc"),
    category: document.getElementById("category")
}

document.getElementById("btn_submit").addEventListener("click", function(e) {
    e.preventDefault();
    const expense = {
        amount: input.amount.value,
        desc: input.desc.value,
        category: input.category.value,
    }
    console.log("Its working");
    add_expenses(expense);
    display_expense(expense);
    console.log(expense);
})

function display_expense(expense) {
    let exp_unique_id = expense.unique_id;
    const p = document.createElement("p");
    const expense_text = `
        Expense: ${expense.amount}, \t 
        Description: ${expense.desc}, \t
        Category: ${expense.category},
    `
    const expense_Text = document.createTextNode(expense_text);
    p.appendChild(expense_Text);
    const x = document.getElementById("display_expenses").appendChild(p);
    
    const edit_btn = document.createElement("button");
    const del_btn = document.createElement("button");
    edit_btn.innerHTML = "Edit";
    del_btn.innerHTML = "Delete";

    p.appendChild(edit_btn);
    p.appendChild(del_btn);

    edit_btn.addEventListener("click", function() {
        edit_expenses(expense);
        p.remove();
    } );
    del_btn.addEventListener("click", function() {
        delete_expenses(exp_unique_id);
        p.remove();
    });

    input.amount.value = "";
    input.desc.value = "";
    input.category.value = "";
}   

function add_expenses(expense) {
    expense.unique_id = Date.now()*Math.random();
    localStorage.setItem(expense.unique_id, JSON.stringify(expense));
}

window.addEventListener("load", constUI());

function constUI() {
    for(let i=0; i<localStorage.length; i++) {
        const unique_id = localStorage.key(i);
        const expense = JSON.parse(localStorage.getItem(unique_id));
        display_expense(expense);
    }
}

function edit_expenses(expense) {
    input.amount.value = expense.amount;
    input.desc.value = expense.desc;
    input.category.value = expense.category;
    delete_expenses(expense.unique_id);
}

function delete_expenses(exp_unique_id) {
    localStorage.removeItem(exp_unique_id);
}
