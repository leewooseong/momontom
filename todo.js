// 변수의 이름을 지정할 때는 다른 js파일의 변수들과 충돌되지 않게 작성해야한다.
// 작은 모듈을 만드는 것을 배우고 싶다면 유투브 클론 강의를 보자!
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//해야할 일을 리스트로 저장
let toDos = [];


// . target?
// console.dir
function deleteToDo(event){
    // event.target : 이벤트가 원래 전달 된 대상에 대한 참조
    // console.log : 요소를 HTML과 같은 트리 구조로 출력
    // console.dir : 지정된 객체의 JSON 표현을 인쇄-> parentNode는 console.dir을 통해 확인가능
    //console.log(event.target.parentNode);  
    const btn = event.target;
    const li = btn.parentNode;
    // 자식을 삭제해줄 수 있다._ html에만 적용.
    toDoList.removeChild(li);
    // filter(Fn) : 모든원소에 대하여 Fn을 true로 만족하는 원소들을 array로 만들어 반환
    const cleanToDos = toDos.filter(function(toDo){
        // 순서가 바뀌면 string인걸 캐치하기가.. 
        //console.log(toDo.id, li.id);
        // toDo.id : Number li.id : string
        // 형변환이 필요하다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


// 리스트를 이용하여 localStorage에 저장
function saveToDos(){
    //***** localStorage에는 JavaScript데이터(boolean, number,object...)를 저장할 수 없다. string 만으로 저장가능_object저장시(아무리 안에 내용이 있어도) 출력이 "object"로 나온다
    //localStorage에 아무리 다른 형으로 저장한다고해도 getItem시 string형으로 반환된다.!
    //JSON(JavaScript Object Notation) : 데이터를 전달할 때 자바스크립트가 그것을 다뤄줄 수 있도록 object를 바꾸주는 기능
    //object <-> string JSON을 이용하면 양방향으로 변환하여 사용이 가능하다. 
    //JSON.stringify를 이용 : object내용을 살려 string에 저장해준다.
    //JSON.parse를 이용 : stringify된 string(object내용)을 object로 살려줌 
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
} 


// 화면에 할일 목록을 표시해주는 함수
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    span.innerText = text

    // 삭제를 위한 addEventListener
    delBtn.addEventListener("click",deleteToDo);
    // appendChild() : 뭔가를 father element안에 넣는 작업
    li.appendChild(span);
    li.appendChild(delBtn);
    // list에 id를 줌으로써 어떤 객체가 지워지는지 알 수 있다.
    li.id = newId;
    // ***내용을 담은 리스트를 html코드에 붙여주기
    toDoList.appendChild(li);
    //list내용을 객체에 저장해서 배열로 관리 text와 id로 나누는 이유는 localStorage에서도 적용이 가능하기 때문 !
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


// input에 입력이 들어왔을 때 처리해주는 함수
function handleSubmit(event){
    event.preventDefault();             //얘는 왜 해주는건감 ? 
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";

}

/*
foreach안에 들어갈 함수는 요렇게 빼서써도 된다.
function something(toDo){
    console.log(toDo.text);
}
*/

// 저장된항목 가져오기 
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
         //JSON.parse를 이용 : stringify된 string(object내용)을 object로 살려줌
         const parsedToDos = JSON.parse(loadedToDos);
        //array의 기능 forEach : array원소 하나하나당 foreach()안의 func이 들어감_여기선 들어오는 array인자를 toDo를 이용해서 받는다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}   


// 초기화 함수
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);

}   
init();


/* 
전체적인 과정
1. 저장된게 있는지 확인
2.1 저장된게 없다면 새로운 입력을 기다림
2.2 저장된게 있다면 그것을 paintToDo로 화면에 출력
    (새로고침을 하면 화면에 출력되었던 것이 사라졌지만 forEach를 통해 다시 불러냄)
*/