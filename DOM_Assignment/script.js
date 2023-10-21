// function add_text() {
//     const text= document.createElement("p");
//     const node = document.createTextNode("This is new Text, after merge of javascript");
//     text.appendChild(node);
//     const element = document.getElementById("btn-div");
//     element.appendChild(text);
// }

// DOM Maniputlation Task 3

// const header = document.getElementById("main-header");
// const add_item_text = document.getElementsByClassName("title")[0];

// header.style.borderBottom = "solid 3px #000";
// add_item_text.style.color = "green";
// add_item_text.style.fontWeight = "bold";

// DOM Manipulation Task 4

// const item_list = document.getElementsByClassName("list-group-item");
// const itemCount = item_list.length;

// for (let i = 0; i < itemCount; i++) {
//     item_list[i].style.fontWeight = "bold";
//     item_list[i].style.color = "Orange"
// }
// item_list[2].style.backgroundColor = "lightgreen";

// DOM manipulation Task 5

// <li class="list-group-item">Item 5</li> (Edit by class name)

// item_list[4].style.color="black";
// item_list[4].style.backgroundColor="burlywood";

// DOM manipulation Task 6

//  item_list[1].style.backgroundColor = "lightgreen";
//  item_list[2].style.display="none";

// const odd = document.querySelectorAll("li:nth-child(odd)");

// for(let i=0; i<odd.length; i++) {
//     odd[i].style.backgroundColor = "#f4f4f4";
// }

// DOM manipulation Task 7
// parent element
const headerTitle = document.getElementById("header-title");
const parentElement = headerTitle.parentElement;
console.log(parentElement);
// last child element
const mainDiv = document.getElementById("main");
const lastElementChild = mainDiv.lastElementChild;
console.log(lastElementChild);
// lastchild
const lastChild = mainDiv.lastChild;
console.log(lastChild);
// first element child
const firstElementChild = mainDiv.firstElementChild;
console.log(firstElementChild);
// nextsibling
const formElement = document.querySelector("form");
const nextSibling = formElement.nextSibling;
console.log(nextSibling);
// nextsibling element
const nextElementSibling = formElement.nextElementSibling;
console.log(nextElementSibling);
//previous sibling 
const ulElement = document.getElementById("items");
const previousSibling = ulElement.previousSibling;
console.log(previousSibling);
//previous sibling element
const previousElementSibling = ulElement.previousElementSibling;
console.log(previousElementSibling);
//create element
const newElement = document.createElement("div");
newElement.setAttribute("class", "custom-class");
console.log(newElement);
//set attribute
const mainHeader = document.getElementById("main-header");
mainHeader.setAttribute("id", "new-id");
//create text node and append child
const textNode = document.createTextNode("New Text Node");
mainDiv.appendChild(textNode);
//create child
const newChild = document.createElement("div");
newChild.textContent = "New Child Element";
parentElement.appendChild(newChild);

// hello world before header
const helloTextNode = document.createTextNode("Hello, World");
headerTitle.parentNode.insertBefore(helloTextNode, headerTitle);
// hello before item 1
const firstListItem = document.querySelector("#items li");
firstListItem.parentNode.insertBefore(helloTextNode, firstListItem);



