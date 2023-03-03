// GLOBAL DEĞİŞKENLER
const cityChoose = document.querySelector('.dropdown-menu')
const url = 'https://api.openweathermap.org/data/2.5/forecast?&units=metric'
const key = 'b44d90a30baabeee3ecccae5bb95a467'
const cities = document.querySelectorAll('.dropdown-item')
const cityNameUI = document.querySelector('.info>h1')
const cityWeatherUI = document.querySelector('.info>h2')
const cityNameChoose = document.querySelector('#dropdownMenuButton1')
let mainTemp = document.querySelector('#mainTempText>h1')
let mainTempImg = document.querySelector('#mainTemp>img')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
let day1 = document.querySelector('#day1')
let day2 = document.querySelector('#day2')
let day3 = document.querySelector('#day3')
let day4 = document.querySelector('#day4')
let day5 = document.querySelector('#day5')


// ŞEHİR İSİMLERİNİN LİSTEYE BASILMASI
fetch('cities_of_turkey.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(function (element) {
            const cities = document.createElement('li')
            cities.textContent = element.name
            cities.classList.add('dropdown-item')
            cityChoose.appendChild(cities)
        })
    })

// ŞEHİR SEÇİLDİĞİNDE İSMİNİN YAZDIRILMASI
cityChoose.addEventListener('click', cityInnertext)
function cityInnertext(e) {
    if (e.target.className == 'dropdown-item') {
        let cityName = e.target.innerText
        cityNameUI.innerHTML = cityName
        cityNameChoose.innerHTML = cityName
        getCity(cityName)
    }
}

// DEFAULT SAYFANIN İLK ŞEHİR ADANA OLARAK GELMESİ
getCity("adana")

function getCity(cityName) {
    // APİ İLE VERİLERİN ÇEKİLMESİ VE ÜST KISMA YAZDIRILMASI
    let api = `${url}&q=${cityName}&appid=${key}`
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            let day1Temp = Math.round(data.list[0].main.temp)
            mainTempImg.src = `${weather(0)}`
            mainTemp.innerHTML = day1Temp + "°"
            let getWind = (data.list[0].wind.speed)
            wind.innerHTML = getWind + " km/h Wind"
            humidity.innerHTML = data.list[0].main.humidity + " Humidity"
            cityWeatherUI.innerHTML = data.list[0].weather[0].main

            // BUGÜNÜN BELİRLENMESİ VE DİĞER GÜNLERİN HESAPLANIP YAZDIRILMASI
            const date = new Date()
            const today = date.getDay()
            const hour = date.getHours()
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const days = [today];
            for (let i = 1; i <= 5; i++) {
                days.push((today + i) % 7);
            }
            const dayUI = (days.map(day => weekdays[day]));


            // İKONLARIN HAVA DURUMUNA GÖRE BASTIRILMASI
            function weather(day) {
                if (data.list[day].weather[0].main == "Clouds") {
                    let Clouds = 'icons/cloudy.png'
                    return Clouds
                } if (data.list[day].weather[0].main == "Rain") {
                    let rainy = 'icons/rainy.png'
                    return rainy
                } if (data.list[day].weather[0].main == "Snow") {
                    let snow = 'icons/snow.png'
                    return snow
                } if (data.list[day].weather[0].main == "Clear") {
                    if (hour > 6 && hour <= 18) {
                        let sunny = 'icons/sunny.png'
                        return sunny
                    }
                } if (data.list[day].weather[0].main == "Clear") {
                    if (hour >= 0 || hour <= 6 || hour >= 18) {
                        let night = 'icons/night.png'
                        return night
                    }
                }
            }

            // VERİLERİN GÜNLERE BASILMASI
            day1.innerHTML = `
                <p>${dayUI[0]}</p>
                <img src=${weather(0)} alt="">
                <p class="degree">${Math.round(data.list[0].main.temp)}°</p>
                <p>${data.list[0].weather[0].main}</p>`

            day2.innerHTML = `
                <p>${dayUI[1]}</p>
                <img src=${weather(8)} alt="">
                <p class="degree">${Math.round(data.list[8].main.temp)}°</p>
                <p>${data.list[8].weather[0].main}</p>`

            day3.innerHTML = `
                <p>${dayUI[2]}</p>
                <img src=${weather(16)} alt="">
                <p class="degree">${Math.round(data.list[16].main.temp)}°</p>
                <p>${data.list[16].weather[0].main}</p>`

            day4.innerHTML = `
                <p>${dayUI[3]}</p>
                <img src=${weather(24)} alt="">
                <p class="degree">${Math.round(data.list[24].main.temp)}°</p>
                <p>${data.list[24].weather[0].main}</p>`

            day5.innerHTML = `
                <p>${dayUI[4]}</p>
                <img src=${weather(32)} alt="">
                <p class="degree">${Math.round(data.list[32].main.temp)}°</p>
                <p>${data.list[32].weather[0].main}</p>`
        })
}




