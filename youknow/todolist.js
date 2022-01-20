/* ## 프로젝트 설명
- 하단의 입력 창에 텍스트(할일)를 입력하면 노란 말풍선 형태의 할일이 추가됩니다.
- 각 할일의 말풍선을 클릭하면 말풍선이 회색으로 바뀝니다.
- 각 할일의 x 버튼을 누르면 말풍선이 사라집니다.
- 화면에 표시되고 있는 할일은 모두 로컬스토리지에 저장되어, 페이지를 꼈다 켜도 사라지지 않고 유지됩니다. */

const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
let todoArr = [];

const paintTodos = (text, finished = false) => {
  const todoItem = document.createElement("li");
  const todoDelBtn = document.createElement("span");
  const newId = todoArr.length + 1;
  todoDelBtn.innerText = "x";
  todoItem.innerText = text;
  if (finished) todoItem.classList.add("done");
  todoItem.appendChild(todoDelBtn);
  todoItem.id = newId;
  todoList.appendChild(todoItem);
  todoItem.addEventListener("click", finishTodo);
  todoDelBtn.addEventListener("click", deleteTodo);
  const toDoObj = {
    text: text,
    id: newId,
    finished: finished,
  };
  todoArr.push(toDoObj);
  saveTodos();
};

const finishTodo = (event) => {
  const li = event.currentTarget;
  li.classList.toggle("done");
  const updateTodo = todoArr.find((todo) => {
    return todo.id === parseInt(li.id);
  });
  const toDoObj = {
    text: updateTodo.text,
    id: updateTodo.id,
    finished: !updateTodo.finished,
  };
  const index = todoArr.indexOf(updateTodo);
  todoArr.splice(index, 1, toDoObj);
  saveTodos();
};

const deleteTodo = (event) => {
  const li = event.currentTarget.parentNode;
  todoList.removeChild(li);
  const cleanTodos = todoArr.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  todoArr = cleanTodos;
  saveTodos();
};

const saveTodos = () => {
  localStorage.setItem("myTodos", JSON.stringify(todoArr));
};

const loadTodos = () => {
  const myTodos = localStorage.getItem("myTodos");
  if (myTodos !== null) {
    const parsedToDos = JSON.parse(myTodos);
    parsedToDos.forEach((toDo) => {
      paintTodos(toDo.text, toDo.finished);
    });
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const currentValue = todoInput.value;
  if (currentValue.length === 0) return;
  paintTodos(currentValue, false);
  todoInput.value = "";
};

const init = () => {
  todoForm.addEventListener("submit", handleSubmit);
  loadTodos();
};

init();
