const startArea = document.querySelector(".start"),
    startBtn = document.querySelector(".startBtn"),
    questionArea = document.querySelector(".question"),
    aBtn = document.querySelector("#A"),
    bBtn = document.querySelector("#B"),
    typeInput = document.querySelector("#type"),
    questionTitle = document.querySelector(".questionTitle"),
    progressBar = document.querySelector(".progressBar"),
    resultArea = document.querySelector(".result"),
    img = document.querySelector(".img"),
    mbtiTitle = document.querySelector(".mbtiTitle"),
    desc = document.querySelector(".desc");


function clickStart(event) {
    startArea.style.display = 'none';
    questionArea.style.display = 'block';
    next();
}

function clickA(event) {
    const type = typeInput.value;
    typeScore = document.querySelector("#"+type);
    typeScore.value = parseInt(typeScore.value)+1
    next();
}

function next(){
    if(num > 12) {
        finish();
        return;
    }
    questionTitle.innerText = q[num]["title"];
    typeInput.value = q[num]["type"];
    aBtn.innerText = q[num]["A"];
    bBtn.innerText = q[num]["B"];
    changeProgress();
    num++;
}

function changeProgress() {
    progressBar.style.width = 100/12*num+"%";
}

function finish(){
    questionArea.style.display="none";
    resultArea.style.display="block";
    
    const EI = parseInt(document.querySelector("#EI").value);
    const SN = parseInt(document.querySelector("#SN").value);
    const TF = parseInt(document.querySelector("#TF").value);
    const JP = parseInt(document.querySelector("#JP").value);
    
    const MBTI = (EI < 2 ? "I" : "E")+(SN < 2 ? "N" : "S")+(TF < 2 ? "F" : "T")+(JP < 2 ? "P" : "J");
    
    mbtiTitle.innerText = m[MBTI]["animal"];
    desc.innerText=m[MBTI]["desc"];
    img.src = m[MBTI]["img"];
    img.alt = m[MBTI]["animal"];
}

function init() {
    startBtn.addEventListener("click", clickStart);
    aBtn.addEventListener("click", clickA);
    bBtn.addEventListener("click", next);
}

let num = 1;

const q = {
    1: {"title": "문제 1번", "type": "EI", "A":"EEEEE EEE EEEEEEE EEEEE EEE EEEEEEE","B":"I"},
    2: {"title": "문제 2번", "type": "SN", "A":"S","B":"N"},
    3: {"title": "문제 3번", "type": "TF", "A":"T","B":"F"},
    4: {"title": "문제 4번", "type": "JP", "A":"J","B":"P"},
    5: {"title": "문제 5번", "type": "EI", "A":"E","B":"I"},
    6: {"title": "문제 6번", "type": "SN", "A":"S","B":"N"},
    7: {"title": "문제 7번", "type": "TF", "A":"T","B":"F"},
    8: {"title": "문제 8번", "type": "JP", "A":"J","B":"P"},
    9: {"title": "문제 9번", "type": "EI", "A":"E","B":"I"},
    10: {"title": "문제 10번", "type": "SN", "A":"S","B":"N"},
    11: {"title": "문제 11번", "type": "TF", "A":"T","B":"F"},
    12: {"title": "문제 12번", "type": "JP", "A":"J","B":"P"}
}

const m = {
    "ISTJ": {"animal":"1", "desc": "test", "img": ".https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "ISTP": {"animal":"2", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "ISFJ": {"animal":"3", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "ISFP": {"animal":"4", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "INTJ": {"animal":"5", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "INTP": {"animal":"6", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "INFJ": {"animal":"7", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "INFP": {"animal":"따끈따끈 피자빵", "desc": "계획을 세우고 조직적으로 일을 이뤄가는 프로일잘러입니다. 당황하지 않고 특유의 냉철함으로 일처리하는 능력이 이 캐릭터의 핵심능력입니다. 감정에 휘둘리지 않고 가끔은 잔소리를 빙자한 독설을 날리기도 합니다", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "ESTJ": {"animal":"1", "desc": "test", "img": "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1-1024x1536.jpg"},
    "ESTP": {"animal":"2", "desc": "test", "img": ".png"},
    "ESFJ": {"animal":"3", "desc": "test", "img": ".png"},
    "ESFP": {"animal":"4", "desc": "test", "img": ".png"},
    "ENTJ": {"animal":"5", "desc": "test", "img": ".png"},
    "ENTP": {"animal":"6", "desc": "test", "img": ".png"},
    "ENFJ": {"animal":"7", "desc": "test", "img": ".png"},
    "ENFP": {"animal":"8", "desc": "test", "img": ".png"},
}

init();