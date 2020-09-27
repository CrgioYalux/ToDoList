function get_todos() {
  var todos = new Array();
  var todos_str = localStorage.getItem("todo");
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

// This function has the main porpuse of fetch the content of the Todo list
//  (which will be a key in the local storage)
// Uses the getItem method to get the to do items saved in the local Storage
// So, if it's the first time that the function is being called, the local storage will be empty
// (so that's why the null), if the return is not null, then the data from the local storage
// will be transformed into a JSON data type var (that's why the parse method)
// Finally the content will be asigned to a array var

function add() {
  var task = document.getElementById("task").value;

  document.getElementById("task").value = "";

  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if (m < 10) {
    m = `0${m}`;
  }
  if (s < 10) {
    s = `0${s}`;
  }
  var text = `(${h}:${m}:${s})`;

  var todos = get_todos();

  if (task !== "") {
    todos.push(`${task}  -  ${text}`);
    localStorage.setItem("todo", JSON.stringify(todos));
    show();
  }

  return false;
}
// this functions gets the value from the input and asigns it to the task var,
// then (with the push method for arrays) the new task is queued at the end of the todos array

function clearDefault(a) {
  if (a.defaultValue === a.value) {
    a.value = "";
  }
}

function remove() {
  var id = this.getAttribute("id");

  var todos = get_todos();
  todos.splice(id, 1);

  localStorage.setItem("todo", JSON.stringify(todos));
  show();

  return false;
}

// "localStorage.setItem('todo', JSON.stringify(todos))" does the job of updating the JSON data
// "splice array's method is used for eliminating task with their id (position)"
function show() {
  var todos = get_todos();

  var html = "<ul>";

  for (var i = 0; i < todos.length; i++) {
    html += `<li class="item">${todos[i]}<div class="remove" id="${i}">x</div> </li>`;
  }
  html += "</ul>";

  document.getElementById("todos").innerHTML = html;

  var buttons = document.getElementsByClassName("remove");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", remove);
  }
}

document.getElementById("add").addEventListener("click", add);
show();
