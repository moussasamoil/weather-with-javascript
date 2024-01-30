// 5ac3551aa78a4c48af2165103230911  


function day(forecastNumber) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = weekday[d.getDay()];
    let nextDay = weekday[d.getDay() + 1];
    let thirdday = weekday[d.getDay() + 2];
    if (forecastNumber == 0) {
        return day;
    }
    else if (forecastNumber == 1) {
        return nextDay;
    }
    else {
        return thirdday;
    }
}
function date() {
    const day = new Date();
    const d = day.getDate();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const m = new Date();
    let name = month[m.getMonth()];
    return (`${d}${name}`);
}

let btn = document.getElementById('btn');
let searchLocation = document.getElementById('location');
let forecast = [];
let current = [];
let loc = [];

btn.addEventListener('click', async function () {
    let search = await searchLocation.value;
    await getWeather(search);
})

async function getWeather(country) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5ac3551aa78a4c48af2165103230911&q=${country}&aqi=no&days=3`)
    let finalResult = await response.json();
    current = await finalResult.current;
    loc = await finalResult.location;
    forecast = await finalResult.forecast.forecastday;
    diplay();
    console.log(finalResult);
    console.log(forecast);
}
getWeather('london');

function diplay() {
    let carton;
    for (let i = 0; i < forecast.length; i++) {
        carton = ` <div class="row w-75 text-white mx-auto">
    <div class="col-md-4 p-4 div1">
        <div class="item fw-bold fs-5 d-flex justify-content-between">
            <p>${day(0)}</p>
            <p>${date()}</p>
        </div>
        <div class="item p-2 fw-bold fs-5">
            <p>${loc.region}</p>
        </div>
        <div class="item  d-flex justify-content-between ">
            <p class="fs-1 fw-bold">${forecast[0].day.avgtemp_c}'C</p>
            <img  src="https:${forecast[0].day.condition.icon}" alt="">
        </div>
        <p class="text-status py-2">${forecast[0].day.condition.text}</p>
        <div class="item d-flex ">
            <div class="inner d-flex">
            <i class="fa-solid fa-umbrella p-1" style="color: #19191a;"></i>
                <p>${current.cloud}%</p>
            </div>
            <div class="inner d-flex px-5">
                <i class="fa-solid fa-wind p-1" style="color: #19191a;"></i>
                <p>${current.wind_kph}km/h</p>
            </div>
            <div class="inner d-flex ">
                <i class="fa-regular fa-compass py-1" style="color: #1e1e1f;"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 div2 p-4">
        <div class="item fw-bold fs-3 text-center">
            <p>${day(1)}</p>
        </div>
        <div class="item text-center d-flex align-items-center justify-content-center">
           <div class="inner my-3">
           <img  src="https:${forecast[1].day.condition.icon}" alt="">
            <p class="fs-1 fw-bold ">${forecast[1].day.avgtemp_c}'C</p>
            <p>${forecast[1].day.avgtemp_f}'F</p>
            <p class="text-status py-2">${forecast[1].day.condition.text}</p>
           </div>
        </div>
    </div>
    <div class="col-md-4 py-4 div1">
        <div class="item fw-bold fs-3 text-center">
            <p>${day(2)}</p>
        </div>
        <div class="item text-center d-flex align-items-center justify-content-center">
           <div class="inner my-3">
           <img  src="https:${forecast[2].day.condition.icon}" alt="">
            <p class="fs-1 fw-bold">${forecast[2].day.avgtemp_c}'C</p>
            <p>${forecast[2].day.avgtemp_f}'F</p>
            <p class="text-status py-2">${forecast[2].day.condition.text}</p>
           </div>
        </div>
    </div>
</div>`;
    }

    document.querySelector('.display').innerHTML = carton;

}