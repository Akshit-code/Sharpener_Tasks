const input1 = document.getElementById("amount");
const input2 = document.getElementById("desc");
const input3 = document.getElementById("category");
const submitBtn = document.getElementById("form-btn");
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

document.querySelector('form').addEventListener('submit', function(e) {
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
    const x = document.getElementById("display-expenses");
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
        const response = await fetch(`http://localhost:3000/homepage/add-expense`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
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
            expense.uniqueID = data.id;
            console.log("From then below output:");
            console.log(expense);
            console.log("User Added");
            displayExpense(expense);
        })
    } catch (err) {
        console.log(err);
    }
};

async function deleteExpense( deleteID ) {
    try {
        const response = await fetch(`http://localhost:3000/homepage/delete-expense/${deleteID}`, {
            method: 'DELETE',
        });
        console.log('Deleted User');
    } catch(err) {
        console.log(err);
    }
}

async function editExpense(expense, editID) {
    try {
        const response = fetch (`http://localhost:3000/homepage/edit-expense/${editID}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                amount: expense.amount,
                desc: expense.desc,
                categoty: expense.category
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

window.addEventListener('load', constUI);
async function constUI() {
    try {
        const response = await fetch(`http://localhost:3000/homepage/refresh`);
        const expenseData = await response.json();
        console.log('***** From Const UI ********');
        console.log(expenseData);
        expenseData.forEach(element => {
            const expense = {
                amount: element.amount,
                desc: element.desc,
                category: element.category,
                uniqueID: element.id
            };
            displayExpense(expense);
        });
        console.log("Refreshed UI");
    } catch (err) {
        console.log(err);
    }
}   


