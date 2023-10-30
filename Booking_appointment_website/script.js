// Form validation
const user = {
    first_name : document.getElementById("first-name"),
    second_name : document.getElementById("second-name"),
    email : document.getElementById("email"),
    gender : document.querySelector('input[name="gender"]:checked'),
    age : document.getElementById("age")
}

const submit_btn = document.getElementById("btn-form");
document.getElementById("first-name").addEventListener("input", validateForm);
document.getElementById("second-name").addEventListener("input",validateForm);
document.getElementById("email").addEventListener("input", validateForm);
document.getElementById("age").addEventListener("input", validateForm);

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("First Name: " + user.first_name.value );
    console.log("Second Name: " + user.second_name.value );
    console.log("Email: " + user.email.value );
    console.log("Gender: " + user.gender.value );
    console.log("Age: " + user.age.value );

} );

function validateForm() {
    if(user.first_name.value && user.second_name.value && user.email.value && user.age.value) {
        submit_btn.disabled = false;
    } else {
        submit_btn.disabled = true;
    }
}

document.getElementById("btn-form").addEventListener("click", display_users);
document.getElementById("btn-form").addEventListener("click", add_user);

function display_users() {
    const new_text = ` First Name: ${user.first_name.value},
    Second Name: ${user.second_name.value},
    Email: ${user.email.value},
    Gender: ${user.gender.value},
    Age: ${user.age.value}`;

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
        // Remove the text, edit button, and delete button
        p.remove();
        edit.remove();
        del.remove();
    });
    del.addEventListener("click", function() {
        p.remove();
        edit.remove();
        del.remove();
    });

    // Clear the input fields
    // user.first_name.value = "";
    // user.second_name.value = "";
    // user.email.value = "";
    // user.age.value = "";
}

function add_user() {
    axios.post('https://crudcrud.com/api/0512fa20e3d746b49af819924ecc3aca/user', {
        first_name : user.first_name.value,
        second_name : user.second_name.value,
        email : user.email.value,
        gender : user.gender.value,
        age :user.age.value
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
    console.log("Added user");
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