const weather = document.querySelector(".js-weather");

//API : 다른 서버로 부터 손쉽게 데이터를 가져올 수 있는 수단
const API_KEY = "e00ec17fb63aac1f07f42c7dc809d031";
const COORDS= 'coords';

// JavaScript는 어떻게 특정 URL을 호출하는가
// JavaScript는 웹사이트로 Request를 보내고 응답을 통해 데이터를 얻어올 수 있다.
// 가져온 데이터는 Refresh없이도 나의 웹사이트에 적용시킬 수 있다.
// 웹사이트 새로고침을 안해도 메일을 확인할 수 있는 이유_JavaScript가 안보이는 곳에서 계속 데이터를 가지고 오고 있기 때문
function getWeather(lat,lng){
    // 데이터를 얻을 땐 fetch라는 것을 이용하면 되고 앞에 https://를 붙여준다. 
    // 마지막에 appid를 붙여주는 이유는 id를 통해서 한 이용자가 서버에 무리하게 이용하는 걸 방지해준다.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            //console.log(response.json()); 요기까지 했을 때 console.log했을 때 대기상태 : Promise 
            return response.json()
        }).then(function(json){
            const temperature = json.main.temp;
            const place =json.name;
            weather.innerText = `${temperature} @ ${place}`
            console.log(json);
        });

    // then() : 데이터가 우리한테 '완전히' 넘어왔을 때 함수 한개를 호출
    // then을 쓰지 않고 다음 작업을 지시할 경우 fetch를 통해 들어오는 데이터를 다 받지 못하는 경우가 발생
    // response만 이용하면 받아온 안의 내용(console.log했을 때의 body의 내용)을 확인할 수 없기 때문에 response.json()을 해준다.
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        //latitude: latitude,
        //longitude: longitude
        // 객체안의 key와 값이 이름이 같은 경우엔 아래와 같이 쓸 수 있다.
        latitude,
        longitude 
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access geolocation");
}

// navigator API
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        //getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init();