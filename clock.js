const clockContainer = document.querySelector(".js-clock"),
    clockTitle = document.querySelector("h1");



// 변수 선언, querySelector는 지정 element의 하위자식을 탐색하는 것_ id는 #을 class는 .을 꼭 붙여줘야한다.

function getTime(){
    // 현재시간 얻고
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // innerText: 태그까지 그대로 들어간다 문자열 그대로를 리턴
    // innerHTML: 태그를 적용시켜, 즉 문자열을 html로 인식하여 리턴 -> 이걸로도 적용해서 해보기 
    clockTitle.innerText = `${(hours < 10) ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`; 
}

// setInterval(fn,time) -> 특정함수를 time마다 실행하는 super cool sexy한 함수
function init(){
    getTime();
    setInterval(getTime,1000);
}
init();
