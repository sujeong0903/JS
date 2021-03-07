const memoContainer = document.querySelector(".memo_area"),
    memoContent = memoContainer.querySelector(".input");

const MEMO_LS = "userMemo";
let userMemo;


function saveMemo(text) {
    localStorage.setItem(MEMO_LS, text);
}

function handleBlur(event) {
    const currentMemo = memoContent.value;
    if(userMemo !== currentMemo) {
        saveMemo(currentMemo);
    }
}

function paintMemo(text) {
    memoContent.value = text;
}

function loadMemo() {
    userMemo = localStorage.getItem(MEMO_LS);
    if(userMemo !== null && userMemo.length !== 0) {
        paintMemo(userMemo);
    }
    memoContent.addEventListener("blur", handleBlur);
    memoContainer.addEventListener("click", function() {
        memoContent.focus();
    })
}

function init() {
    loadMemo();
}

init();