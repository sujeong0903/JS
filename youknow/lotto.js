/* ## 프로젝트 설명
- 추첨 버튼을 누르면 1부터 45까지의 숫자 중 6개를 무작위로 선택하여 보여줍니다.
- 다시 버튼을 누르면 기존에 표시되던 6개의 숫자가 사라지고, 다시 추첨할 수 있게 됩니다.*/

const drawButton = document.getElementById("draw");
const resetButton = document.getElementById("reset");
const lottoArea = document.getElementById("lottoArea");

let numbers = [];

const drawNumber = () => {
  drawButton.disabled = true;
  while (numbers.length < 6) {
    const temp = Math.floor(Math.random() * 45 + 1);
    if (!numbers.includes(temp)) {
      numbers.push(temp);
    }
  }
  numbers.sort((a, b) => {
    return a - b;
  });
  numbers.forEach((number) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.textContent = number;
    lottoArea.appendChild(item);
  });
};

const resetNumber = () => {
  numbers = [];
  lottoArea.innerHTML = "";
  drawButton.disabled = false;
};

drawButton.addEventListener("click", drawNumber);
resetButton.addEventListener("click", resetNumber);
