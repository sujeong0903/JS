const toDoList = document.querySelector(".todo_list"),
    toDoInput = document.querySelector(".add_input");
    toDoForm = document.querySelector(".add_form")
    bar = document.querySelector(".bar"), 
    activeBar = bar.querySelector(".active_bar"),
    emotion = bar.querySelector(".emotion"),
    tooltip = bar.querySelector(".tooltip");


const TODO_LS = "userTodo";
let toDos = [];

function handleSubmit(evet) {
    evet.preventDefault();
    const currentValue = toDoInput.value;
    if(currentValue.length === 0) return;
    paintToDo(currentValue, false);
    toDoInput.value = "";
}

function changeEmotion(number) {
    if(number >= 0 && number <=20) {
        emotion.src = "./src/images/img1.png";
        tooltip.innerText = "분발하세요!";
    } else if(number >20 && number <=40) {
        emotion.src = "./src/images/img2.png";
        tooltip.innerText = "조금 더 힘내";
    } else if(number >40 && number <=60) {
        emotion.src = "./src/images/img3.png";
        tooltip.innerText = "아자아자";
    } else if(number >60 && number <=80) {
        emotion.src = "./src/images/img4.png";
        tooltip.innerText = "거의 끝났어요";
    } else if(number >80 && number <=100) {
        emotion.src = "./src/images/img5.png";
        tooltip.innerText = "참 잘했어요"
    }
}

function paintRate() {
    let finishedTodo = 0;
    let rate = 0
    if(toDos.length !==0) {
        toDos.forEach(function(toDo) {
            if(toDo.finished === true) finishedTodo+=1;
        });
        rate = finishedTodo / toDos.length * 100;
        
    }
    activeBar.style.width = rate+"%";
    changeEmotion(rate);
}

function finishToDo(evnet) {
    const btn = evnet.currentTarget;
    const li = btn.parentNode;
    li.classList.toggle("finished");
    const updateToDo = toDos.find(function(toDo) {
        return toDo.id === parseInt(li.id);
    });
    const toDoObj = {
        text: updateToDo.text,
        id: updateToDo.id,
        finished: !updateToDo.finished,
    }
    const index = toDos.indexOf(updateToDo);
    toDos.splice(index,1,toDoObj);
    saveTodos();
}

function deleteToDo(event) {
    const btn = event.currentTarget;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(todo) {
        return todo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
    paintRate();
}

function paintToDo(text, finished=false) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const img = document.createElement("img");
    const newId = toDos.length + 1;
    li.classList.add("todo_item");
    if(finished) li.classList.add("finished");
    span.classList.add("todo_text");
    span.innerText = text;
    span.addEventListener("click",finishToDo);
    delBtn.classList.add("delete_btn");
    delBtn.classList.add("btn");
    img.src = "./src/images/icon_delete.png";
    img.alt = "지우기"
    delBtn.appendChild(img);
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        finished: finished,
    }
    toDos.push(toDoObj);
    saveTodos();
}

function loadToDo() {
    const loadToDos = localStorage.getItem(TODO_LS);
    if(loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, toDo.finished);
        });
    }
}

function init() {
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();