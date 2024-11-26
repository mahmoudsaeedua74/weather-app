"use strict"
const myApiKey = "0499bb72d012444ea52174459240910"
const bassicURL = "https://api.weatherapi.com/v1/forecast.json"
let cityName = document.querySelector(".city")
let dayOne = document.querySelector(".day-one")
let dayTwo = document.querySelector(".day-two")
let dayThree = document.querySelector(".day-three")
let degreesCelsiusOnre = document.querySelector(".degrees-one-celsius")
let degreesCelsiusTwo = document.querySelector(".degrees-two-celsius")
let degreesCelsiusThree = document.querySelector(".degrees-three-celsius")
let degreesCelsiusSecondOne = document.querySelector(".degrees-celsius-second")
let degreesCelsiusSecondTow = document.querySelector(".degrees-celsius-second-Tow")
let imag = document.querySelectorAll(".icon")
console.log(imag)
let searchText = document.querySelector(".searchText")

searchText.addEventListener("input", function (e) {
    let country = this.value
    getWeather(country)

})

async function getWeather(country) {
    try {
        let getResponse = await fetch(`${bassicURL}?key=${myApiKey}&q=${country}&days=3`)
        let finalResponse = await getResponse.json()
        cityName.textContent = `${finalResponse.location.name}`

        console.log(finalResponse)
        displayWeatherDate(finalResponse)
    }
    catch (error) {
        console.error("Error fetching weather data:");
    }

}
getWeather()

function displayWeatherDate(date) {
    let arrForecast = date.forecast.forecastday;
    const dayElements = [dayOne, dayTwo, dayThree];
    const degreesCelsius = [degreesCelsiusOnre, degreesCelsiusTwo, degreesCelsiusThree]
    const degreesCelsiusSecond = [degreesCelsiusSecondTow, degreesCelsiusSecondOne]
    let datday = document.querySelector(".day-one-dat")
    const sup = document.createElement("sup")
    const supO = sup.textContent = "°"
    for (let i = 0; i < arrForecast.length; i++) {
        const forecastDate = new Date();
        const weekDay = forecastDate.toLocaleDateString("en-us", { weekday: "long" });
        dayElements[i].textContent = `${weekDay}`;
        degreesCelsius[i].textContent = `${arrForecast[i].day.avgtemp_c}${supO}c`
        imag[i].setAttribute("src", `https:${arrForecast[i].day.condition.icon}`)
        degreesCelsiusSecond[i].textContent = `${arrForecast[i].day.mintemp_c}${supO}c`
        datday.textContent = `${forecastDate.getDate()}`
    }
}

function myPostion(postion) {
    let latitude = postion.coords.latitude
    let longitude = postion.coords.longitude
    let myCurrentPosition = `${latitude} ,${longitude}`
    getWeather(myCurrentPosition)

}
navigator.geolocation.getCurrentPosition(myPostion) 
