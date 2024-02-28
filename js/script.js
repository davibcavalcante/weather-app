const showErrorMessage = () => {
  const weatherContainer = document.querySelector('.weather-container');
  weatherContainer.innerHTML = '';

  const errorContainer = document.createElement('section')
  errorContainer.classList.add('error-container')
  errorContainer.innerHTML = `
    <img src="imagens/not-found.png" alt="Image 404 Error">
    <p>Oops! Invalid location :/</p>
  `;

  weatherContainer.appendChild(errorContainer)
  weatherContainer.classList.remove('hidden');
}

const createChildElement = (data, parent, parentClass) => {
  const parentElement = document.createElement(parent);
  parentElement.classList.add(parentClass);
  const weather = data.weather[0].main;

  if (parentClass === 'image-container') {
    const weatherClass = weather.toLowerCase();
    parentElement.classList.add(weatherClass);
  } else if (parentClass === 'info-container') {
    const temp = data.main.temp.toFixed(0);
    parentElement.innerHTML = `
      <h1>${temp}<sup>°c<sup></h1>
      <h2>${weather}</h2>
    `;
  } else if (parentClass === 'description-container') {
    const humidityValue = data.main.humidity;
    const windSpeed = data.wind.speed;
    parentElement.innerHTML = `
    <section class="humidity">
      <i class="fa-sharp fa-solid fa-water"></i>
      <p>${humidityValue}% </br> Humidity</p>
    </section>
    <section class="wind">
      <i class="fa-sharp fa-solid fa-wind"></i>
      <p>${windSpeed}Km/h </br> Wind Speed</p>
    </section>
    `;
  }

  return parentElement;
}

const createElements = (data) => {
  const weatherContainer = document.querySelector('.weather-container');
  weatherContainer.innerHTML = '';
  weatherContainer.classList.remove('hidden');

  weatherContainer.appendChild(createChildElement(data, 'section', 'image-container'));
  weatherContainer.appendChild(createChildElement(data, 'section', 'info-container'));
  weatherContainer.appendChild(createChildElement(data, 'section', 'description-container'));
}

const getRequest = (location, apiKey, lang) => {
  if (location.length > 0) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=${lang}`;
  } else {
    return false;
  }
}

const getApiData = async (e) => {
  e.preventDefault();
  const location = document.querySelector('#location-input').value;
  const apiKey = 'e2754291aa06d0db6b4d049c93516889';
  const lang = 'pt_br';

  const req = getRequest(location, apiKey, lang);

  if (!req) return;

  const results = await fetch(req);
  if (!results.ok) {
    showErrorMessage();
    return;
  }

  const data = await results.json();
  createElements(data);
}

const setFormEvents = () => {
    const form = document.querySelector('#form');

    form.addEventListener('submit', getApiData);
}

const getHour = () => {
  const data = new Date()
  return data.getHours()
}

const setBodyEvents = (body) => {
  const hour = getHour();
  if (hour < 12 && hour >= 6) {
    body.classList.add('morning');
  } else if (hour < 18 && hour >= 12) {
    body.classList.add('afternoon');
  } else {
    body.classList.add('night');
  }
}

window.addEventListener('load', () => {
  const body = document.querySelector('body')
  setFormEvents();
  setBodyEvents(body);
})