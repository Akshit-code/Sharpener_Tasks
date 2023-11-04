// Form validation
let is_editing = false;
const submit_btn = document.getElementById("btn-form");
let input1 = document.getElementById("first-name");
let input2 = document.getElementById("second-name");
let input3 = document.getElementById("email");
let input4 = document.querySelector('input[name="gender"]:checked');
let input5 = document.getElementById("age");

input1.addEventListener("input", validateForm);
input2.addEventListener("input", validateForm);
input3.addEventListener("input", validateForm);
input5.addEventListener("input", validateForm);


const genderInputs = document.querySelectorAll('input[name="gender"]');
genderInputs.forEach((input) => {
  input.addEventListener("change", () => {
    input4 = document.querySelector('input[name="gender"]:checked');
    validateForm();
  });
});


function validateForm() {
  if(is_editing) {
    submit_btn.disabled = true;
  } else if ( (input1.value.trim() !=='')  && (input2.value.trim() !=='') 
    && (input3.value.trim() !=='') &&  (input5.value.trim() !=='') && input4) {
		submit_btn.disabled = false;
	} else {
		submit_btn.disabled = true;
	}
}


document.querySelector("form").addEventListener("submit", function(e) {
	e.preventDefault();
	const user = {
    first_name : input1.value,
		second_name : input2.value,
		email : input3.value,
		gender : input4.value,
		age : input5.value,
    unique_id: null
	}
  add_user(user);
});

function display_users(user) {
  const delete_id = user.unique_id;
  const edit_id = user.unique_id;

	const new_text = ` First Name: ${user.first_name},
    Second Name: ${user.second_name},
    Email: ${user.email},
    Gender: ${user.gender},
    Age: ${user.age}`;

	const p = document.createElement("p");
	p.appendChild(document.createTextNode(new_text));

	const edit = document.createElement("button");
	const del = document.createElement("button");
	const x = document.getElementById("display_user");
	x.appendChild(p);
	x.appendChild(edit);
	x.appendChild(del);
	edit.innerHTML = "edit";
	del.innerHTML = "delete";

	edit.classList.add("edit-button");
	del.classList.add("delete-button");

  let btn_update;
	edit.addEventListener("click", function() {
    is_editing = true;
    input1.value = user.first_name;
	  input2.value = user.second_name;
	  input3.value = user.email;
    input4 = document.querySelector('input[name="gender"]:checked');
	  input5.value = user.age;
		p.remove();
		edit.remove();
		del.remove();
    submit_btn.disabled = true;
    btn_update = document.createElement("button");
    btn_update.textContent = "Update";
    document.getElementById("form_fieldset").appendChild(btn_update);
    btn_update.addEventListener("click", function() {
      user.first_name = input1.value;
      user.second_name = input2.value;
      user.email = input3.value;
      user.gender = input4.value;
      user.age = input5.value;
      edit_user(user, edit_id);
      btn_update.remove();
    });
	});

	del.addEventListener("click", function() {
    delete_user(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	input1.value = "";
	input2.value = "";
	input3.value = "";
	input5.value = "";
}

function add_user(user) {
    axios.post('https://crudcrud.com/api/1f079d20a2a44432b826d8e76bd5c200/user', {
        first_name : user.first_name,
        second_name : user.second_name,
        email : user.email,
        gender : user.gender,
        age : user.age,
        unique_id: null
    })
      .then(res =>  {
        showOutput(res);
        user.unique_id = res.data._id;
        display_users(user);
      })
    .catch(err => console.error(err))
    console.log("Added user");
}

function delete_user(delete_id) {
  axios.delete(`https://crudcrud.com/api/1f079d20a2a44432b826d8e76bd5c200/user/${delete_id}`)
  .then(res => showOutput(res))
  .catch( err => console.error(err))
  console.log('DELETE Request');
}

window.addEventListener('load', constUI);
function constUI() {
  axios.get('https://crudcrud.com/api/1f079d20a2a44432b826d8e76bd5c200/user')
    .then (res => {
      const users_data = res.data;
      users_data.forEach(users_data => {
        users_data.unique_id = users_data._id;
        display_users(users_data);
      })
      showOutput(res)
    })
    .catch(err => console.error(err));
  console.log('Refreshed UI');
}

function edit_user(user, edit_id) {
  axios.put(`https://crudcrud.com/api/1f079d20a2a44432b826d8e76bd5c200/user/${edit_id}`, {
    first_name : user.first_name,
    second_name : user.second_name,
    email : user.email,
    gender : user.gender,
    age : user.age
  })
  .then( ()=> {
    display_users(user);
  })
  .catch(err => console.error(err));
}

function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}