// Form validation
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
	if ( (input1.value.trim() !=='')  && (input2.value.trim() !=='') 
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

	edit.addEventListener("click", function() {
    input1.value = user.first_name;
	  input2.value = user.second_name;
	  input3.value = user.email;
    input4.value = user.gender;
	  input5.value = user.age;
    delete_user(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	del.addEventListener("click", function() {
    console.log("First Name: " + user.first_name );
	  console.log("Second Name: " + user.second_name );
	  console.log("Email: " + user.email );
	  console.log("Gender: " + user.gender);
	  console.log("Age: " + user.age );
    console.log("IN del Listenter unique_id: " + user.unique_id );
    delete_user(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	input1.value = "";
	input2.value = "";
	input3.value = "";
  input4.value = "";
	input5.value = "";
}

function add_user(user) {
    axios.post('https://crudcrud.com/api/ec0884275ca64d50ba46ddcf1c14adcfuser', {
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
        console.log(`Added User (ID: ${user.unique_id})`);
        display_users(user);
      })
    .catch(err => console.error(err))
    console.log("Added user");
}

function delete_user(delete_id) {
  axios.delete(`https://crudcrud.com/api/ec0884275ca64d50ba46ddcf1c14adcf/${delete_id}`)
  .then(res => showOutput(res))
  .catch( err => console.error(err))
  console.log('DELETE Request');
}

window.addEventListener('load', constUI);
function constUI() {
  axios.get('https://crudcrud.com/api/794a7a5588da4fc69e0e33de20462ec2/user')
    .then (res => {
      const users_data = res.data;
      users_data.forEach(users_data => {
        users_data.unique_id = users_data._id;
        display_users(users_data);
        console.log("In constUI : " + users_data.unique_id);
      })
      console.log(users_data)
      showOutput(res)
    })
    .catch(err => console.error(err));
  console.log('Refreshed UI');
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