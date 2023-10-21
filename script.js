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