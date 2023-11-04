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
	const x = document.getElementById("display_order");
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
}

// Adding orders
function add_order(order) {
    axios.post("https://crudcrud.com/api/d32584a9fa374b3d83b6ccd9d9a5fed3/orders", {
        dish : order.dish,
        price : order.price,
        table_no : order.table_no,
        unique_id: null
    })
      .then(res =>  {
        order.unique_id = res.data._id;
        display_order(order);
      })
    .catch(err => console.error(err))
}

// Delete Order
function delete_order(delete_id) {
  axios.delete(`https://crudcrud.com/api/d32584a9fa374b3d83b6ccd9d9a5fed3/orders/${delete_id}`)
  .catch( err => console.error(err))
}

// Edit orders
function edit_order(order, edit_id) {
    console.log(order.unique_id == edit_id);
    axios.put(`https://crudcrud.com/api/d32584a9fa374b3d83b6ccd9d9a5fed3/orders/${edit_id}`, {
      dish: order.dish,
      price: order.price,
      table_no: order.table_no
    })
    .then( ()=> {
        display_order(order);
        console.log("Order updated sucessfully");
      } ) 
      .catch(err=> console.error(err));
}

// Const UI
window.addEventListener('load', constUI);
function constUI() {
  axios.get('https://crudcrud.com/api/d32584a9fa374b3d83b6ccd9d9a5fed3/orders')
    .then (res => {
        const orders_data = res.data;
        orders_data.forEach(orders_data => {
        orders_data.unique_id = orders_data._id;
        display_order(orders_data);
      })
    })
    .catch(err => console.error(err));
}
