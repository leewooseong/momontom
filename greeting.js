const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}


// event 발생시 root에서 발생(form에서 발생)_일종의 거품 같은 것
// 올라가면서 다른 모든 것들이 거품에 반응
// form을 제출하는 event발생-> event가 document까지 올라감(document도 거품에 반응 = document가 다른 곳으로 보내짐(새로고침과 비슷하게)) 
// submit(event)에 대한 document의 기본 동작을 없애주고 싶다.
// preventDefault 사용  
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit)
}


//사용자가 등록되어있다면 색칠을 칠해준다._ 보여주는 부분
//css부분에 있어서 헷갈릴 때 : https://aboooks.tistory.com/85d
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

// 여기서 사용하는 localStorage는 url을 기반을 작동한다.
// url기반으로 그 정보를 해당 localStorage에 저장
// 저장된 정보 가져오고 없다면 정보 삽입.
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // the person is not enrolled.
        askForName();
    } else {
        // the person is enrolled.
        paintGreeting(currentUser);
    }
}

// 지금 작성한 프로그램은 currentUser라는 이름의 값만 저장할 수 잇다.
// 값 변경 시 인스펙터-> 어플리케이션을 통해서 지울 수 있고 
// 새로 고침시 새로 값을 받아올 수 있다._ 강의는 여기까지!
function init(){
    loadName();
}
init();