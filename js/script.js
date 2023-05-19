const btnLocation = document.querySelector('#btn-location')
const inputLocation = document.querySelector('#input-location')

const notFoundError = document.querySelector('.not-found')
const weather = document.querySelector('.weather-img')
const imgTemp = document.querySelector('.img')
const tempInformation = document.querySelector('.information h1')
const tempLocation = document.querySelector('.information h2')
const humidityParagraph = document.querySelector('.humidity p')
const windParagraph = document.querySelector('.wind p')

btnLocation.addEventListener('click', (e) => {
    e.preventDefault()
    const accessKey = 'e2754291aa06d0db6b4d049c93516889'
    const city = inputLocation.value
    const lang = 'pt_br'

    if (city === '') return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${accessKey}&lang=${lang}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod >= 400) {
            weather.classList.add('hide')
            notFoundError.classList.remove('hide')
            inputLocation.focus()
        } else {
            notFoundError.classList.add('hide')
            weather.classList.remove('hide')
    
            const weatherLocation = json.weather[0].main
            const temp = json.main.temp
            const tempFormatted = temp.toFixed(0)
            const windSpeed = json.wind.speed
            const humidity = json.main.humidity

            switch (weatherLocation) {
                case 'Clouds': 
                    imgTemp.style.backgroundImage = "url('imagens/cloud.png')"
                    tempLocation.innerText = weatherLocation
                    tempInformation.innerHTML = `${tempFormatted}<sup>°c<sup>`
                    humidityParagraph.innerHTML = `${humidity}% </br> Humidity`
                    windParagraph.innerHTML = `${windSpeed}Km/h </br> Wind Speed`
                    inputLocation.focus()
                    break

                case 'Clear': imgTemp.style.backgroundImage = "url('imagens/sun.png')"
                    tempLocation.innerText = weatherLocation
                    tempInformation.innerHTML = `${tempFormatted}<sup>°c<sup>`
                    humidityParagraph.innerHTML = `${humidity}% </br> Humidity`
                    windParagraph.innerHTML = `${windSpeed}Km/h </br> Wind Speed`
                    inputLocation.focus()
                    break

                case 'Thunderstorm': imgTemp.style.backgroundImage = "url('imagens/sun-and-rain.png')"
                    tempLocation.innerText = weatherLocation
                    tempInformation.innerHTML = `${tempFormatted}<sup>°c<sup>`
                    humidityParagraph.innerHTML = `${humidity}% </br> Humidity`
                    windParagraph.innerHTML = `${windSpeed}Km/h </br> Wind Speed`
                    inputLocation.focus()
                    break

                case 'Rain': imgTemp.style.backgroundImage = "url('imagens/rain.png')"
                    tempLocation.innerText = weatherLocation
                    tempInformation.innerHTML = `${tempFormatted}<sup>°c<sup>`
                    humidityParagraph.innerHTML = `${humidity}% </br> Humidity`
                    windParagraph.innerHTML = `${windSpeed}Km/h </br> Wind Speed`
                    inputLocation.focus()
                    break

                case 'Snow': imgTemp.style.backgroundImage = "url('imagens/snow.png')"
                    tempLocation.innerText = weatherLocation
                    tempInformation.innerHTML = `${tempFormatted}<sup>°c<sup>`
                    humidityParagraph.innerHTML = `${humidity}% </br> Humidity`
                    windParagraph.innerHTML = `${windSpeed}Km/h </br> Wind Speed`
                    inputLocation.focus()
                    break
            }

        }
    })
})



