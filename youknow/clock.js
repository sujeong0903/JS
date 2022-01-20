/* ## 프로젝트 설명
- 오늘 날짜와 현재 시간을 화면에 표시합니다.
- 시간은 초 단위로 흘러갑니다. */

const today = document.getElementById("today");
const time = document.getElementById("time");

const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  today.textContent = `${year}년 ${month < 10 ? `0${month}` : month}월 ${
    day < 10 ? `0${day}` : day
  }일`;
  time.textContent = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
};
getTime();
setInterval(getTime, 1000);
