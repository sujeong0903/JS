const goalContainer = document.querySelector(".info_goal"),
    goalContent = goalContainer.querySelector(".input");

const GOAL_LS = "userGoal";
let userGoal;


function saveGoal(text) {
    localStorage.setItem(GOAL_LS, text);
}

function handleBlur(event) {
    const currentGoal = goalContent.value;
    if(userGoal !== currentGoal) {
        saveGoal(currentGoal);
    }
}

function paintGoal(text) {
    goalContent.value = text;
}

function loadGoal() {
    userGoal = localStorage.getItem(GOAL_LS);
    if(userGoal !== null && userGoal.length !== 0) {
        paintGoal(userGoal);
    }
    goalContent.addEventListener("blur", handleBlur);
    goalContainer.addEventListener("click", function() {
        goalContent.focus();
    })
}

function init() {
    loadGoal();
}

init();