const body = document.querySelector("body");

const IMG_NUMBER = 4; 

/*
function handleImgLoad(){
    console.log("finished loading");
}*/

function paintImage(imgNumber){
    // new ???
    // new 연산자는 사용자 정의 객체 타입 또는 내장 객체 타입의 인스턴스를 생성한다.
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
    // loadEnd???
    // API???(Aplication Programming Interface,응용 프로그램 프로그래밍 인터페이스 )
    // https://medium.com/@dydrlaks/api-%EB%9E%80-c0fd6222d34c
    // 즉 블로그에서 다음지도를 가져와 쓸 수 있게하는 것 처럼 프로그램과 프로그램을 연결시켜주는 것!
    // api를 이용해 image를 가져온다면 아래의 코드가 도움이 된다.
    //image.addEventListener("loadend",handleImgLoad);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();