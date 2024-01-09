// API KEY 829c895c715f357870080ab66b49a478

// HTML ELEMENTS
let iconPath = `fill`


const iconBtnElement = document.querySelector(".icon-btn");

// iconBtnElement.addEventListener("click", function () {

  
//   if (iconBtnElement.classList.contains("fill")) {
//     iconBtnElement.classList.remove("fill");
//     iconBtnElement.classList.add("line");

//     let iconPath = 'line'
    
//     console.log(iconPath +'1');
//     weatherIconElement.innerHTML = `<img src="/icons/${iconPath}/${weather.iconId}.svg" alt="icon"></img>`;


//   } else if (iconBtnElement.classList.contains("line")) {
//     iconBtnElement.classList.remove("line");
//     iconBtnElement.classList.add("fill");

//     let iconPath = 'fill'

//     console.log(iconPath + '2');
//     weatherIconElement.innerHTML = `<img src="/icons/${iconPath}/${weather.iconId}.svg" alt="icon"></img>`;
//   }

// });

const locationElement = document.querySelector(".location p");
const errorMsgElement = document.querySelector(".errorMsg");
const weatherIconElement = document.querySelector(".weather-icon");

const temperatureValueElement = document.querySelector(
  ".temperature-value span"
);
const temperatureDescriptionElement = document.querySelector(
  ".temperature-description p"
);
const temperatureRessentieElement = document.querySelector(
  ".temperature-ressentie p"
);
const temperatureMinElement = document.querySelector(".temperature-min p");
const temperatureMaxElement = document.querySelector(".temperature-max p");

const pressionElement = document.querySelector(".pression p");
const humiditeElement = document.querySelector(".humidité p");
const ventElement = document.querySelector(".vent p");

const sunriseElement = document.querySelector(".sunrise p");
const sunsetElement = document.querySelector(".sunset p");

const mapElement = document.querySelector(".container map");

const indiceATMOElement = document.querySelector(".indice-ATMO p");
const o3Element = document.querySelector(".o3 p");
const no2Element = document.querySelector(".no2 p");
const so2Element = document.querySelector(".so2 p");
const pm2_5Element = document.querySelector(".pm2_5 p");
const pm10Element = document.querySelector(".pm10 p");

const weather = {};
const airPollution = {};


weather.temperature = {
  unit: "celsius",
};

//
const key = "829c895c715f357870080ab66b49a478";
const lang = "fr";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  errorMsgElement.style.display = "block";
  errorMsgElement.innerHTML = `<p> Geolocalisation indisponible. </p>`;
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let latitudeInterger = Math.round(latitude);
  console.log(`latInterger `+ latitudeInterger);

  let longitude = position.coords.longitude;
  let longitudeInterger = Math.round(longitude);
  console.log(`longInterger `+ longitudeInterger);

  getWeather(latitude, longitude, longitudeInterger, latitudeInterger);
  getAirPollution(latitude, longitude);
  getForecast(latitude, longitude)
}

function showError(error) {
  errorMsgElement.style.display = "block";
  errorMsgElement.innerHTML = `<p> ${error.message} </p>`;
}

function getAirPollution(latitude, longitude) {
  let apiAirPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(apiAirPollution);

  fetch(apiAirPollution)
    .then(function (response) {
      let dataAirPollution = response.json();
      console.log(dataAirPollution);
      return dataAirPollution;
    })

    .then(function (dataAirPollution) {
      airPollution.o3 = dataAirPollution.list[0].components.o3;
      airPollution.no2 = dataAirPollution.list[0].components.no2;
      airPollution.so2 = dataAirPollution.list[0].components.so2;
      airPollution.pm2_5 = dataAirPollution.list[0].components.pm2_5;
      airPollution.pm10 = dataAirPollution.list[0].components.pm10;

      airPollution.nh3 = dataAirPollution.list[0].components.nh3;

      console.log(airPollution);
    })
    .then(function () {
      calculateAirQuality(airPollution);
    });

  return;
}

function calculateAirQuality(airPollution) {
  let indiceATMO = "";
  let o3Level = "";
  let no2Level = "";
  let so2Level = "";
  let pm2_5Level = "";
  let pm10Level = "";

  const level01 = "Bon";
  const level02 = "Moyen";
  const level03 = "Dégradé";
  const level04 = "Mauvais";
  const level05 = "Très mauvais";
  const level06 = "Extrêmement mauvais";

  if (airPollution.o3 < 50) {
    o3Level = level01;
  } else if (airPollution.o3 > 50 && airPollution.o3 < 100) {
    o3Level = level02;
  } else if (airPollution.o3 > 100 && airPollution.o3 < 130) {
    o3Level = level03;
  } else if (airPollution.o3 > 130 && airPollution.o3 < 240) {
    o3Level = level04;
  } else if (airPollution.o3 > 240 && airPollution.o3 < 380) {
    o3Level = level05;
  } else if (airPollution.o3 > 380) {
    o3Level = level06;
  }

  console.log(`o3 = ` + o3Level);

  if (airPollution.no2 < 40) {
    no2Level = level01;
  } else if (airPollution.no2 > 40 && airPollution.no2 < 90) {
    no2Level = level02;
  } else if (airPollution.no2 > 90 && airPollution.no2 < 120) {
    no2Level = level03;
  } else if (airPollution.no2 > 120 && airPollution.no2 < 230) {
    no2Level = level04;
  } else if (airPollution.no2 > 230 && airPollution.no2 < 340) {
    no2Level = level05;
  } else if (airPollution.no2 > 340) {
    no2Level = level06;
  }

  console.log("no2 = " + no2Level);

  if (airPollution.so2 < 100) {
    so2Level = level01;
  } else if (airPollution.so2 > 100 && airPollution.so2 < 200) {
    so2Level = level02;
  } else if (airPollution.so2 > 200 && airPollution.so2 < 350) {
    so2Level = level03;
  } else if (airPollution.so2 > 350 && airPollution.so2 < 500) {
    so2Level = level04;
  } else if (airPollution.so2 > 500 && airPollution.so2 < 750) {
    so2Level = level05;
  } else if (airPollution.so2 > 750) {
    so2Level = level06;
  }

  console.log("so2 = " + so2Level);

  if (airPollution.pm2_5 < 20) {
    pm2_5Level = level01;
  } else if (airPollution.pm2_5 > 20 && airPollution.pm2_5 < 40) {
    pm2_5Level = level02;
  } else if (airPollution.pm2_5 > 40 && airPollution.pm2_5 < 50) {
    pm2_5Level = level03;
  } else if (airPollution.pm2_5 > 50 && airPollution.pm2_5 < 100) {
    pm2_5Level = level04;
  } else if (airPollution.pm2_5 > 100 && airPollution.pm2_5 < 150) {
    pm2_5Level = level05;
  } else if (airPollution.pm2_5 > 150) {
    pm2_5Level = level06;
  }

  console.log("pm2_5 = " + pm2_5Level);

  if (airPollution.pm10 < 10) {
    pm10Level = level01;
  } else if (airPollution.pm10 > 10 && airPollution.pm10 < 20) {
    pm10Level = level02;
  } else if (airPollution.pm10 > 20 && airPollution.pm10 < 25) {
    pm10Level = level03;
  } else if (airPollution.pm10 > 25 && airPollution.pm10 < 50) {
    pm10Level = level04;
  } else if (airPollution.pm10 > 50 && airPollution.pm10 < 75) {
    pm10Level = level05;
  } else if (airPollution.pm10 > 75) {
    pm10Level = level06;
  }

  console.log("pm10 = " + pm10Level);

  if (
    o3Level == level06 ||
    no2Level == level06 ||
    so2Level == level06 ||
    pm2_5Level == level06 ||
    pm10Level == level06
  ) {
    indiceATMO = level06;
  } else if (
    o3Level == level05 ||
    no2Level == level05 ||
    so2Level == level05 ||
    pm2_5Level == level05 ||
    pm10Level == level05
  ) {
    indiceATMO = level05;
  } else if (
    o3Level == level04 ||
    no2Level == level04 ||
    so2Level == level04 ||
    pm2_5Level == level04 ||
    pm10Level == level04
  ) {
    indiceATMO = level04;
  } else if (
    o3Level == level03 ||
    no2Level == level03 ||
    so2Level == level03 ||
    pm2_5Level == level03 ||
    pm10Level == level03
  ) {
    indiceATMO = level03;
  } else if (
    o3Level == level02 ||
    no2Level == level02 ||
    so2Level == level02 ||
    pm2_5Level == level02 ||
    pm10Level == level02
  ) {
    indiceATMO = level02;
  } else if (
    o3Level == level01 ||
    no2Level == level01 ||
    so2Level == level01 ||
    pm2_5Level == level01 ||
    pm10Level == level01
  ) {
    indiceATMO = level01;
  }

  console.log("ATMO = " + indiceATMO);

  displayAirPollution(indiceATMO, airPollution);
}

function displayAirPollution(indiceATMO, airPollution) {
  indiceATMOElement.innerHTML = indiceATMO;

  if (indiceATMO == "Très mauvais") {
    indiceATMOElement.classList.add("tresMauvais");
  } else if (indiceATMO == "Extrêmement mauvais") {
    indiceATMOElement.classList.add("extremementMauvais");
  } else {
    indiceATMOElement.classList.add(indiceATMO);
  }

  o3Element.innerHTML = `${airPollution.o3}<span>µg/m3</span>`;
  no2Element.innerHTML = `${airPollution.no2}<span>µg/m3</span>`;
  so2Element.innerHTML = `${airPollution.so2}<span>µg/m3</span>`;
  pm2_5Element.innerHTML = `${airPollution.pm2_5}<span>µg/m3</span>`;
  pm10Element.innerHTML = `${airPollution.pm10}<span>µg/m3</span>`;

  return;
}

function getWeather(latitude, longitude, longitudeInterger, latitudeInterger) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=${lang}`;

  console.log(api);

  let apiMap = `https://tile.openweathermap.org/map/clouds_new/2/${latitudeInterger}/${longitudeInterger}.png?appid=${key}`;

  console.log(apiMap);

  fetch(api)
    .then(function (response) {
      let dataWeather = response.json();
      console.log(dataWeather);
      return dataWeather;
    })

    .then(function (dataWeather) {
      weather.description = dataWeather.weather[0].description;
      weather.iconId = dataWeather.weather[0].icon;
      weather.temperature.value = dataWeather.main.temp;
      weather.city = dataWeather.name;
      weather.country = dataWeather.sys.country;
      weather.feelsLike = dataWeather.main.feels_like;
      weather.tempMin = dataWeather.main.temp_min;
      weather.tempMax = dataWeather.main.temp_max;
      weather.pressure = dataWeather.main.pressure;
      weather.humidity = dataWeather.main.humidity;
      weather.windSpeed = dataWeather.wind.speed;
      weather.sunriseUNIX = dataWeather.sys.sunrise;
      weather.sunsetUNIX = dataWeather.sys.sunset;

      // Formatted time
      let unixTimestampSunrise = dataWeather.sys.sunrise;
      const dateSunrise = new Date(unixTimestampSunrise * 1000);
      const hoursSunrise = dateSunrise.getHours();
      const minutesSunrise = dateSunrise.getMinutes();
      const formattedTimeSunrise =
        hoursSunrise.toString().padStart(2, "0") +
        ":" +
        minutesSunrise.toString().padStart(2, "0");

      weather.sunrise = formattedTimeSunrise;

      // Formatted time
      let unixTimestampSunset = dataWeather.sys.sunset;
      const dateSunset = new Date(unixTimestampSunset * 1000);
      const hoursSunset = dateSunset.getHours();
      const minutesSunset = dateSunset.getMinutes();
      const formattedTimeSunset =
        hoursSunset.toString().padStart(2, "0") +
        ":" +
        minutesSunset.toString().padStart(2, "0");

      weather.sunset = formattedTimeSunset;
      console.log(weather);
    })
    .then(function () {
      displayWeather();
    });

  return;
}


function displayWeather() {
  weatherIconElement.innerHTML = `<img src="icons/${iconPath}/${weather.iconId}.svg" alt="icon"></img>`;
  temperatureDescriptionElement.innerHTML = weather.description;
  temperatureValueElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  locationElement.innerHTML = `${weather.city} ${weather.country}`;
  temperatureRessentieElement.innerHTML = `${weather.feelsLike}°<span>C</span>`;
  temperatureMinElement.innerHTML = `${weather.tempMin}°<span>C</span>`;
  temperatureMaxElement.innerHTML = `${weather.tempMax}°<span>C</span>`;
  pressionElement.innerHTML = `${weather.pressure}°<span>hPA</span>`;
  humiditeElement.innerHTML = `${weather.humidity}°<span>%</span>`;
  ventElement.innerHTML = `${weather.windSpeed}<span>km/h</span>`;
  sunriseElement.innerHTML = `${weather.sunrise}`;
  sunsetElement.innerHTML = `${weather.sunset}`;
}

function getForecast(latitude, longitude) {
  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=${lang}`;

  console.log(apiForecast);


  fetch(apiForecast)
    .then(function (response) {
      let dataForecast = response.json();
      console.log(dataForecast);
      return dataForecast;
    })

  }
