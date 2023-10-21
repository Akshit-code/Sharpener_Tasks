function add_text() {
    const text= document.createElement("p");
    const node = document.createTextNode("This is new Text, after merge of javascript");
    text.appendChild(node);
    const element = document.getElementById("btn-div");
    element.appendChild(text);
}