const input1 = document.getElementById("amount");
const input2 = document.getElementById("desc");
const input3 = document.getElementById("category");
const submitBtn = document.getElementById("form-btn");
const expenseForm  = document.getElementById("expense-from");
const expenseFormDiv = document.getElementById("expense-form-section");
const displayExpensesDiv = document.getElementById("display-expenses-div");
const expensesTableBody = document.getElementById("expensesTableBody");
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
    expenseFormDiv.style.display = "none";
    expenseForm.style.display="none";
    addExpense(expense);
});

// const table = document.createElement("table");
// table.classList.add("expense-table");

// const headerRow = table.insertRow();
// const headers = ["Date","Amount", "Description", "Category", "Edit", "Delete"];
// headers.forEach((headerText) => {
//     const headerCell = document.createElement("th");
//     headerCell.textContent = headerText;
//     headerCell.classList.add("expense-header");
//     headerRow.appendChild(headerCell);
// });

// function displayExpense(expense) {
//     displayExpensesDiv.style.display = 'block';
//     const editID = expense.expensesId;
//     const deleteID = expense.expensesId ;

//     const row = table.insertRow();
//     const cell1 = row.insertCell(0);
//     const cell2 = row.insertCell(1);
//     const cell3 = row.insertCell(2);
//     const cell4 = row.insertCell(3);
//     const cell5 = row.insertCell(4);
//     const cell6 = row.insertCell(5);
//     const date = new Date((expense.date));
//     const constformattedDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
//     cell1.innerHTML = constformattedDate;
//     cell2.innerHTML = expense.amount;
//     cell3.innerHTML = expense.desc;
//     cell4.innerHTML = expense.category;

//     const editBtn = document.createElement("button");
//     const delBtn = document.createElement("button");
//     editBtn.innerHTML = "Edit";
//     delBtn.innerHTML = "Delete";
//     editBtn.classList.add("edit-button");
//     delBtn.classList.add("delete-button");
//     cell5.appendChild(editBtn);
//     cell6.appendChild(delBtn);
//     let updateBtn;

//     editBtn.addEventListener("click", function() {
//         expenseFormDiv.style.display = "block";
//         expenseForm.style.display="block";
//         isEditing = true;
//         input1.value = expense.amount;
//         input2.value = expense.desc;
//         input3.value = expense.category;
//         p.remove();
//         editBtn.remove();
//         delBtn.remove();
//         submitBtn.disabled = true;
//         updateBtn = document.createElement("button");
//         updateBtn.innerHTML = "Update";
//         document.getElementById("form-fieldset").appendChild(updateBtn);
//         updateBtn.addEventListener("click", function() {
//             expense.amount = input1.value;
//             expense.desc = input2.value;
//             expense.category = input3.value;
//             editExpense(expense, editID);
//             updateBtn.remove();
//             isEditing = false;
//             expenseFormDiv.style.display = "none";
//             expenseForm.style.display="none";
//         });
//     });

//     delBtn.addEventListener("click", function() {
//         deleteExpense(deleteID);
//         p.remove();
//         editBtn.remove();
//         delBtn.remove();
//     });
//     displayExpensesDiv.appendChild(table);
//     input1.value = '';
//     input2.value = '';
//     input3.value = '';
// }

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
        console.log("Added Expenses Successfully");
        expense.expensesId = data.expensesId;
        expense.userId = data.userId;
        displayExpensePage(expense);
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
        });
        console.log("Deleted Expenses Successfully");
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
            console.log("Edited Expenses Successfully");
            displayExpensePage(expense);
        })
    } catch(err) {
        console.log(err);
    }
}

window.addEventListener('load', ()=> {
    const token = localStorage.getItem('token');
    if(!!token) {
        getExpenses();
    }
});

let expenseData;
async function getExpenses() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/homepage/get-expenses`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('***** From Const UI ********');
 
        if(response.status == 200) {
            expenseData = await response.json();
            expenseData.forEach(element => {
                const expense = {
                    amount: element.amount,
                    desc: element.desc,
                    category: element.category, 
                    expensesId : element.id,
                    date: element.createdAt
                };
            });
            displayExpensePage(expenseData);
            // Initial display on page load
            paginate(expenseData); 
        } else if(response.status == 204) {
            console.log("No expenses found for the provided email");
        } else {
            console.error();
        }
    } catch (err) {
        console.log(err);
    }
};

let currentExpensePage = 1;
let rowsPerPage = 5;
const perPageRows = document.getElementById("rowsPerPageSelect");

perPageRows.addEventListener("change", ()=> {
    rowsPerPage = parseInt(perPageRows.value);
    displayExpensePage(expenseData, currentExpensePage);
})
 
function displayExpensePage(expenses, currentPage = 1) {
    displayExpensesDiv.style.display = 'block';
    const isSingleExpense = !Array.isArray(expenses);
    if (isSingleExpense) {
        expenses = [expenses];
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedExpenses = expenses.slice(startIndex, endIndex);
    expensesTableBody.innerHTML = '';

    paginatedExpenses.forEach (expenses => {
        const editID = expenses.id;
        const deleteID = expenses.id;
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        const date = new Date((expenses.createdAt));
        const constformattedDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
        dateCell.textContent = constformattedDate;
        row.appendChild(dateCell);
        
        
        const amountCell = document.createElement('td');
        amountCell.textContent = expenses.amount;
        row.appendChild(amountCell);

        const descCell = document.createElement('td');
        descCell.textContent = expenses.desc;
        row.appendChild(descCell)

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expenses.category;
        row.appendChild(categoryCell)

        const editBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        delBtn.innerHTML = "Delete";
        editBtn.classList.add("edit-button");
        delBtn.classList.add("delete-button");

        const editCell = document.createElement('td');
        editCell.appendChild(editBtn);
        row.appendChild(editCell)

        const deleteCell = document.createElement('td');
        deleteCell.appendChild(delBtn);
        row.appendChild(deleteCell);

        expensesTableBody.appendChild(row);

        let updateBtn;
        editBtn.addEventListener("click", function() {
            expenseFormDiv.style.display = "block";
            expenseForm.style.display="block";
            isEditing = true;
            input1.value = expenses.amount;
            input2.value = expenses.desc;
            input3.value = expenses.category;
            editBtn.remove();
            delBtn.remove();
            submitBtn.disabled = true;
            updateBtn = document.createElement("button");
            updateBtn.innerHTML = "Update";
            document.getElementById("form-fieldset").appendChild(updateBtn);
            updateBtn.addEventListener("click", function() {
                expenses.amount = input1.value;
                expenses.desc = input2.value;
                expenses.category = input3.value;
                editExpense(expenses, editID);
                updateBtn.remove();
                isEditing = false;
                expenseFormDiv.style.display = "none";
                expenseForm.style.display="none";
            });
        });
        delBtn.addEventListener("click", function() {
            deleteExpense(deleteID);
            p.remove();
            editBtn.remove();
            delBtn.remove();
        });
    });
}


function paginate(expenseData) {
    const totalPages = Math.ceil(expenseData.length / rowsPerPage);
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    document.getElementById('currentPage').textContent = `Page ${currentExpensePage}`;

    prevPageButton.disabled = currentExpensePage === 1;
    nextPageButton.disabled = currentExpensePage >= totalPages;

    const startIndex = (currentExpensePage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, expenseData.length);

    const expensesForCurrentPage = expenseData.slice(startIndex, endIndex);

    displayExpensePage(expensesForCurrentPage);
}


document.getElementById('prevPage').addEventListener('click', () => {
    if (currentExpensePage > 1) {
        currentExpensePage--;
        paginate(expenseData);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(expenseData.length / rowsPerPage);
    if (currentExpensePage < totalPages) {
        currentExpensePage++;
        paginate(expenseData);
    }
});

