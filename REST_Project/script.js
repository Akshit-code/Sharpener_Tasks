// Form validation
const submit_btn = document.getElementById("btn-form");
let input1 = document.getElementById("dish");
let input2 = document.getElementById("price");
let input3 = document.querySelector('input[name="table"]:checked');

input1.addEventListener("input", validateForm);
input2.addEventListener("input", validateForm);


const genderInputs = document.querySelectorAll('input[name="table"]');
genderInputs.forEach((input) => {
  input.addEventListener("change", () => {
    input3 = document.querySelector('input[name="table"]:checked');
    validateForm();
  });
});

function validateForm() {
	if ( (input1.value.trim() !=='')  && (input2.value.trim() !=='') 
     && input3) {
		submit_btn.disabled = false;
	} else {
		submit_btn.disabled = true;
	}
}

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

function display_order(order) {
    const delete_id = order.unique_id;
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

	edit.addEventListener("click", function() {
        input1.value = order.dish;
        input2.value = order.price;
        delete_order(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	del.addEventListener("click", function() {
        delete_order(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	input1.value = "";
	input2.value = "";
}

function add_order(order) {
    axios.post('https://crudcrud.com/api/ec0884275ca64d50ba46ddcf1c14adcf/order', {
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

function delete_order(delete_id) {
  axios.delete(`https://crudcrud.com/api/ec0884275ca64d50ba46ddcf1c14adcf/order/${delete_id}`)
  .catch( err => console.error(err))
}

window.addEventListener('load', constUI);
function constUI() {
  axios.get('https://crudcrud.com/api/ec0884275ca64d50ba46ddcf1c14adcf/order')
    .then (res => {
      const orders_data = res.data;
      orders_data.forEach(orders_data => {
        orders_data.unique_id = orders_data._id;
        display_order(orders_data);
      })
    })
    .catch(err => console.error(err));
}
