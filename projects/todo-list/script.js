// Date actuelle

const date = new Date();

//


const form = document.getElementById("form");
const input = document.getElementById("input");
const todosContainer = document.getElementById("todos-container");

const todos = JSON.parse(localStorage.getItem("todos"));

const instructionsDiv = document.getElementById('instructions');


if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

// Ajouter un todo au DOM

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("div");
    todoEl.classList.add("task");

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("txt-div");

    const todoCheckDiv = document.createElement("div");
    todoCheckDiv.classList.add("check-div");

    const todoCheck = document.createElement("div");
    todoCheck.classList.add("check");

    instructionsDiv.classList.add('invisible');

    

    if(todo && todo.completed) {
        todoEl.classList.add('completed')
        todoTextDiv.classList.toggle("completed");
        todoCheckDiv.classList.toggle("completed");
        todoCheck.classList.toggle("completed");


    }

    todoTextDiv.innerText = todoText;

    todoEl.addEventListener("click", () => {
        todoTextDiv.classList.toggle("completed");
      todoEl.classList.toggle("completed");
      todoCheck.classList.toggle("completed");
      todoCheckDiv.classList.toggle("completed");

      


      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosContainer.appendChild(todoEl);

    todoEl.appendChild(todoCheckDiv);
    todoCheckDiv.appendChild(todoCheck);

    todoEl.appendChild(todoTextDiv);

    input.value = "";

    updateLS();

    instructions();


  }
}

// Ajouter le todo au Local Storage

function updateLS() {
  const todosContenu = document.querySelectorAll(".txt-div");

  const todosArray = [];

  todosContenu.forEach(todoTextDiv => {
    todosArray.push({
      text: todoTextDiv.innerText,
      completed: todoTextDiv.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todosArray));
}

// Cache les instructions

function instructions() {
    const instructionsDiv = document.getElementById('instructions');

    instructionsDiv.classList.add('invisible');
    // instructionsDiv.classList.toggle('invisible');

}
