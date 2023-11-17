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
};


document.querySelector("form").addEventListener("submit", function(e) {
	e.preventDefault();
	const user = {
    firstName : input1.value,
		secondName : input2.value,
		email : input3.value,
		gender : input4.value,
		age : input5.value,
	}
  addUser(user);
});

function display_users(user) {
  const delete_id = user.uniqueId;
  const edit_id = user.uniqueId;
  
	const new_text = ` First Name: ${user.firstName},
    Second Name: ${user.secondName},
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
    input1.value = user.firstName;
	  input2.value = user.secondName;
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
      user.firstName = input1.value;
      user.secondName = input2.value;
      user.email = input3.value;
      user.gender = input4.value;
      user.age = input5.value;
      editUser(user, edit_id);
      btn_update.remove();
    });
	});

	del.addEventListener("click", function() {
    deleteUser(delete_id);
		p.remove();
		edit.remove();
		del.remove();
	});

	input1.value = "";
	input2.value = "";
	input3.value = "";
	input5.value = "";
};

function addUser(user) {
  fetch('http://localhost:3000/add-booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      gender: user.gender,
      age: user.age,
    }),
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    user.uniqueId = data.id;
    console.log(user.uniqueId);
    display_users(user);
    console.log(user);
    console.log("Added user");
  })
  .catch(err => {
    console.error(err);
  });
}


async function deleteUser(deleteId) {
  try {
    const response = await fetch(`http://localhost:3000/delete-booking/${deleteId}`, {
      method: 'DELETE',
    });
    console.log('DELETE Request');
  } catch (err) {
    console.error(err);
  }
}

async function editUser(user, editId) {
  try {
    const response = await fetch(`http://localhost:3000/update-booking/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          firstName: user.firstName,
          secondName: user.secondName,
          email: user.email,
          gender: user.gender,
          age: user.age
        }
      ),
    });
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('load', constUI);
async function constUI() {
  try {
    const response = await fetch('http://localhost:3000/get-all-bookings');
    const usersData = await response.json();
    console.log(usersData);
    usersData.forEach(async (userData) => {
      const user = {
        firstName: userData.firstName,
        secondName: userData.secondName,
        email: userData.email,
        gender: userData.gender,
        age: userData.age,
        uniqueId: userData.id,
      };
      display_users(user);
    });
    console.log('Refreshed UI');
  } catch (err) {
    console.error(err);
  }
}