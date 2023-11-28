
const input1 = document.getElementById("amount");
const input2 = document.getElementById("desc");
const input3 = document.getElementById("category");
const submitBtn = document.getElementById("form-btn");
const expenseForm  = document.getElementById("expense-from");

let isEditing = false;

input1.addEventListener('input', validateForm);
input2.addEventListener('input', validateForm);
input3.addEventListener('change', validateForm);

function validateForm() {
    if ( isEditing ) {
        submitBtn.disabled = true;
    } else if ( (input1.value.trim() !== '') && (input2.value.trim() !== '') && (input3.value.trim() !== '') && isEditing === false ) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const expense = {
        amount: input1.value,
        desc: input2.value,
        category: input3.value
    }
    console.log(expense);
    addExpense(expense);
});


function displayExpense(expense) {
    const x = document.getElementById("display-expenses");
    x.style.display = 'block';
    const editID = expense.uniqueID;
    const deleteID = expense.uniqueID;

    const newText = `Amount: ${expense.amount},
        Description: ${expense.desc}, 
        Category: ${expense.category}`
    
    const p =  document.createElement("p");
    p.appendChild(document.createTextNode(newText));

    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    delBtn.innerHTML = "Delete";
    
    x.appendChild(p);
    x.appendChild(editBtn);
    x.appendChild(delBtn);
    editBtn.classList.add("edit-button");
	delBtn.classList.add("delete-button");
    let updateBtn;

    editBtn.addEventListener("click", function() {
        isEditing = true;
        input1.value = expense.amount;
        input2.value = expense.desc;
        input3.value = expense.category;
        p.remove();
        editBtn.remove();
        delBtn.remove();
        submitBtn.disabled = true;
        updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        document.getElementById("form-fieldset").appendChild(updateBtn);
        updateBtn.addEventListener("click", function() {
            expense.amount = input1.value;
            expense.desc = input2.value;
            expense.category = input3.value;
            editExpense(expense, editID);
            updateBtn.remove();
            isEditing = false;
        });
    });

    delBtn.addEventListener("click", function() {
        deleteExpense(deleteID);
        p.remove();
        editBtn.remove();
        delBtn.remove();
    });

    input1.value = '';
    input2.value = '';
    input3.value = '';
}

async function addExpense(expense) {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(`http://localhost:3000/homepage/add-expense`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( {
                amount: expense.amount,
                desc: expense.desc,
                category: expense.category
            }),
        })
        const data = await response.json();
        expense.uniqueID = data.id;
        expense.user = data.user;
        console.log("Expense details after API call:");
        console.log(expense);
        displayExpense(expense);
    } catch (err) {
        console.log(err);
    }
};

async function deleteExpense( deleteID ) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/homepage/delete-expense/${deleteID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch(err) {
        console.log(err);
    }
}

async function editExpense(expense, editID) {
    try {
        const token = localStorage.getItem('token');
        const response = fetch (`http://localhost:3000/homepage/edit-expense/${editID}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( {
                amount: expense.amount,
                desc: expense.desc,
                category: expense.category
            }),
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log("***** From edit Listner ****");
            console.log(expense);
            displayExpense(expense);
        })
    } catch(err) {
        console.log(err);
    }
}

window.addEventListener('load', ()=> getExpenses());
async function getExpenses() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/homepage/getExpenses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const expenseData = await response.json();
        console.log('***** From Const UI ********');
        console.log(expenseData);
        expenseData.forEach(element => {
            const expense = {
                amount: element.amount,
                desc: element.desc,
                category: element.category,
                uniqueID: element.id,
                user: element.user
            };
            displayExpense(expense);
        });
    } catch (err) {
        console.log(err);
    }
}   