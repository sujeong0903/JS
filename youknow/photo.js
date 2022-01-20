/* ## 프로젝트 설명
 - 페이지를 처음 열면 CALL 버튼만 보입니다. 
 - 버튼을 누르면 2초 후에 포토 앨범이 등장합니다. 
 - 포토 앨범은 서버로부터 받아 온 n개의 이미지 소스를 표시합니다. (Ajax 방식의 통신)
 - 한 번에 하나의 이미지만 보여주며, 버튼을 눌러 좌우로 이동할 수 있습니다. */

const url = "https://cat.beansdrawer.com/api/breeds/image/random/10";
const request = new XMLHttpRequest();
let photos = [];
let index = 0;
const button = document.getElementById("click");
const albumArea = document.querySelector(".albumArea");
const preButton = document.getElementById("pre");
const nextButton = document.getElementById("next");
const img = document.querySelector("img");

request.addEventListener("load", () => {
  const imgUrl = JSON.parse(request.responseText);
  photos = imgUrl.message;
  img.src = photos[index];
});

button.addEventListener("click", () => {
  button.disabled = true;
  request.open("GET", url);
  request.send();
  setTimeout(() => {
    button.style.display = "none";
    albumArea.style.display = "block";
  }, 2000);
});

preButton.addEventListener("click", () => {
  index -= 1;
  if (index < 0) {
    index = photos.length - 1;
  }
  img.src = photos[index];
});

nextButton.addEventListener("click", () => {
  index += 1;
  if (index >= photos.length) {
    index = 0;
  }
  img.src = photos[index];
});
