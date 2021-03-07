const form = document.querySelector(".name"),
    input = form.querySelector(".input"),
    title = document.querySelector(".title");

const USER_LS = "userName";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const nameText = input.value;
    paintName(nameText);
    saveName(nameText);
}

function askForName() {
    form.classList.add("showing");
    title.classList.remove("showing");
    form.addEventListener("submit",handleSubmit);
    input.focus();
}

function paintName(text){
    title.classList.add("showing");
    form.classList.remove("showing");
    title.innerText = `${text}'s ToDo List`;
}

function loadName() {
    const userName = localStorage.getItem(USER_LS);
    if(userName === null) {
        askForName();
    } else {
        paintName(userName);
    }
}

function init() {
    loadName();

}

init();