// Form validation
const submit_btn = document.getElementById("btn_form");
let is_editing = false;
let input1 = document.getElementById("dish");
let input2 = document.getElementById("price");
let input3 = document.querySelector('input[name="table"]:checked');

input1.addEventListener("input", validateForm);
input2.addEventListener("input", validateForm);

const orderInputs = document.querySelectorAll('input[name="table"]');
orderInputs.forEach((input) => {
    input.addEventListener("change", () => {
    input3 = document.querySelector('input[name="table"]:checked');
    validateForm();
  });
});

function validateForm() {
  if(is_editing) {
      submit_btn.disabled = true;
  } else if ( (input1.value.trim() !=='')  && (input2.value.trim() !=='') 
     && input3) {
		submit_btn.disabled = false;
	} else {
		submit_btn.disabled = true;
	}
}

// Submitting details
document.querySelector("form").addEventListener("submit", function(e) {
	e.preventDefault();
  	const order = {
        dish: input1.value,
		    price : input2.value,
		    table_no : input3.value,
        unique_id: null
	}
    add_order(order);
});


// Display Order
function display_order(order) {
    // getting ids of order.
    const delete_id = order.unique_id;
    const edit_id = order.unique_id;

    const new_text = ` Dish: ${order.dish},
    Price: ${order.price},
    Table No: ${order.table_no}
    `;

	const p = document.createElement("p");
	p.appendChild(document.createTextNode(new_text));

	const edit = document.createElement("button");
	const del = document.createElement("button");
	const table_1 = document.getElementById("table_1_orders");
  const table_2 = document.getElementById("table_2_orders");
  const table_3 = document.getElementById("table_3_orders");

  let x; 
  if(order.table_no == 'table_1') {
    x = table_1;
  } else if (order.table_no == 'table_2') {
    x = table_2;
  } else {
    x = table_3;
  }

	x.appendChild(p);
	x.appendChild(edit);
	x.appendChild(del);
	edit.innerHTML = "edit";
	del.innerHTML = "delete";

	edit.classList.add("edit-button");
	del.classList.add("delete-button");

  let btn_update;
  // Edit functionality
	edit.addEventListener("click", function() {
    is_editing = true;
    input1.value = order.dish;
    input2.value = order.price;
    input3 = document.querySelector('input[name="table"]:checked');
    p.remove();
    edit.remove();
    del.remove();
    submit_btn.disabled = true;
    btn_update = document.createElement("button");
    btn_update.textContent = 'Update';
    document.getElementById("form_fieldset").appendChild(btn_update);
    btn_update.addEventListener("click", function() {
        order.dish=  input1.value;
		    order.price = input2.value;
		    order.table_no = input3.value;
        edit_order(order, edit_id);
        btn_update.remove();
        is_editing = false;
    });
	});

  // Delete Functionality
	del.addEventListener("click", function() {
        delete_order(delete_id);
		    p.remove();
		    edit.remove();
		    del.remove();
	});

  // clear input fields
  input1.value = "";
  input2.value = "";
  document.getElementById("table_1").checked = false;
  document.getElementById("table_2").checked = false;
  document.getElementById("table_3").checked = false;
}

// Adding orders
async function add_order(order) {
  try {
    const response = await axios.post("https://crudcrud.com/api/46849402312b448191b0fa01590ce3b7/orders", {
      dish: order.dish,
      price: order.price,
      table_no: order.table_no,
      unique_id: null,
    });
    order.unique_id = response.data._id;
    display_order(order);
    console.log("Added order");
  } catch (error) {
    console.error(error);
  }
}

// Delete Order
async function delete_order(delete_id) {
  try {
    await axios.delete(`https://crudcrud.com/api/46849402312b448191b0fa01590ce3b7/orders/${delete_id}`);
    console.log("Deleted Order")
  } catch (error) {
    console.error(error);
  }
}

// Edit orders
async function edit_order(order, edit_id) {
  try {
    const response = await axios.put(`https://crudcrud.com/api/46849402312b448191b0fa01590ce3b7/orders/${edit_id}`, {
      dish: order.dish,
      price: order.price,
      table_no: order.table_no,
    });
    display_order(order);
    console.log("Order updated successfully");
  } catch (error) {
    console.error(error);
  }
}

// Const UI
async function constUI() {
  try {
    const response = await axios.get('https://crudcrud.com/api/46849402312b448191b0fa01590ce3b7/orders');
    const orders_data = response.data;
    orders_data.forEach((orders_data) => {
      orders_data.unique_id = orders_data._id;
      display_order(orders_data);
    });
    console.log("UI Refreshed");
  } catch (error) {
    console.error(error);
  }
}
window.addEventListener('load', constUI);

// retrieve data

async function retrieve_data() {
  const retrieve_table_no = 'table_3';
  try {
    const response = await axios.get('https://crudcrud.com/api/46849402312b448191b0fa01590ce3b7/orders');
    const orders_data = response.data;
    orders_data.forEach((orders_data) => {
      if(orders_data.table_no == retrieve_table_no) {
        console.log("Retrieve data for " + retrieve_table_no);
        console.log(orders_data);
      }
    });
  } catch (error) {
      console.log(error);
  }
}
retrieve_data();
