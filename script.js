function add_text() {
    const text= document.createElement("p");
    const node = document.createTextNode("This is new Text, after merge of javascript");
    text.appendChild(node);
    const element = document.getElementById("btn-div");
    element.appendChild(text);
}

// DOM Maniputlation Task 3

const header = document.getElementById("main-header");
const add_item_text = document.getElementsByClassName("title")[0];

header.style.borderBottom = "solid 3px #000";
add_item_text.style.color = "green";
add_item_text.style.fontWeight = "bold";

// DOM Manipulation Task 4

const item_list = document.getElementsByClassName("list-group-item");
const itemCount = item_list.length;

for (let i = 0; i < itemCount; i++) {
    item_list[i].style.fontWeight = "bold";
    item_list[i].style.color = "Orange"
}
item_list[2].style.backgroundColor = "green";

// DOM manipulation Task 5

// <li class="list-group-item">Item 5</li> (Edit by class name)

item_list[4].style.color="black";
item_list[4].style.backgroundColor="burlywood";
