let is_editing = false;
const input1 = document.getElementById("amount");
const input2 = document.getElementById("desc");
const input3 = document.getElementById("category");
const submit_btn = document.getElementById("btn_submit");

// Add event listeners to input fields
input1.addEventListener("input", validate_form);
input2.addEventListener("input", validate_form);
input3.addEventListener("change", validate_form);

document.getElementById("btn_submit").addEventListener("click", function (e) {
    e.preventDefault();
    const expense = {
        amount: input1.value,
        desc: input2.value,
        category: input3.value,
        unique_id: null
    };
    
    add_expenses(expense);
    display_expense(expense);
});

function validate_form() {
    if (input1.value.trim() !== '' && input2.value.trim() !== '' && input3.value !== '0' && is_editing == false) {
        submit_btn.disabled = false;
    } else {
        submit_btn.disabled = true;
    }
}

// Initial validation
validate_form();

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

    let update_btn;

    edit_btn.addEventListener("click", function() {
        is_editing = true;
        submit_btn.disabled = true;
        input1.value = expense.amount;
        input2.value = expense.desc;
        input3.value = expense.category;
        p.remove();
        update_btn = document.createElement("button");
        document.getElementById("form_fieldset").appendChild(update_btn);
        update_btn.innerHTML = "Update";
        update_btn.classList.add("btn", "btn-primary")
        update_btn.addEventListener("click", function() {
            expense.amount = input1.value;
            expense.desc = input2.value;
            expense.category = input3.value;
            edit_expenses(expense, exp_unique_id);
            update_btn.remove();
        });
    } );

    del_btn.addEventListener("click", function() {
        delete_expenses(exp_unique_id);
        p.remove();
    });

    input1.value = "";
    input2.value = "";
    input3.value = "";
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

function edit_expenses(expense, exp_unique_id) {
    localStorage.setItem(exp_unique_id,JSON.stringify(expense) );
    display_expense(expense);
}

function delete_expenses(exp_unique_id) {
    localStorage.removeItem(exp_unique_id);
}
