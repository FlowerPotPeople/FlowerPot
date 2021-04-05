// defines selected elements in varibales for reuse throughout this script
let weatherIcon = document.querySelector(".weather-icon");
let rainfallFigure = document.querySelector(".rainfall-figure");

let rainfallFigureContent = rainfallFigure.textContent;
let weatherIconSource = weatherIcon.src;

const weatherApiKey = "7e5922ef7f6bc85e485e53b28667f43a";
// const weatherApiUrlNormal = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${weatherApiKey}&units=metric`
// const weatherApiUrlRain = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${weatherApiKey}&units=metric&dt=${yesterdayUnix}`

function updateWeatherWidgets() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(userPosition) {
        let userCoordinatesResponseObject = userPosition.coords;
        let userCoordinatesObject = {
            usersLatitude: userCoordinatesResponseObject.latitude,
            usersLongitude: userCoordinatesResponseObject.longitude,
        };
        const lon = userCoordinatesObject.usersLongitude;
        const lat = userCoordinatesObject.usersLatitude;
        const excludeParams = "minutely";
        // unix here is temp, could embed this function in the url itself -- for testing i will leave it as a variable here
        const yesterdayUnix = (moment().unix() - 86400 * 4) / 1;
        const weatherApiUrlNormal = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${weatherApiKey}&units=metric`;
        const weatherApiUrlRain = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${weatherApiKey}&units=metric&dt=${yesterdayUnix}`;
        getWeather(weatherApiUrlNormal, false);
        getWeather(weatherApiUrlRain, true);
    }
    function error(err) {
        // TODO: handle errors
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getWeather(weatherApiUrl, rain) {
    fetch(weatherApiUrl)
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error("Weather api failed");
        })
        .then(function (data) {
            rain ? updateRainfall(data) : updateWeatherIcon(data);
        })
        .catch(function (error) {
            // handle error so that user knows something went wrong
            // DON'T JUST CONSOLE LOG
        });
}

function useWeatherObj(weatherObj) {
    // this funciton will conaint the DOM manipulation based on the response.json()
    console.log(weatherObj);
}
function updateWeatherIcon(data) {
    // debugger;
    const currentUserDt = data.current.dt;
    const todaysUserSunset = data.current.sunset;
    const isDay = currentUserDt < todaysUserSunset;
    console.log(isDay);
    const currentWeatherMainDescription = data.current.weather[0].main;
    const currentWeatherDescription = data.current.weather[0].description;
    const currentWeatherCode = data.current.weather[0].id;
    console.log(currentWeatherCode);
    const baseSrc = "assets/images/widget-icons/";

    if (currentWeatherCode === 800 && isDay) {
        weatherIcon.src = `${baseSrc}sun.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, sun icon.`;
    } else if (
        (currentWeatherCode === 801 || currentWeatherCode === 802) &&
        isDay
    ) {
        weatherIcon.src = `${baseSrc}sun-and-cloud.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, sun and cloud icon together`;
    } else if (currentWeatherMainDescription === "Rain") {
        weatherIcon.src = `${baseSrc}rain.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, cloud with rain`;
    } else if (currentWeatherMainDescription === "Thunderstorm") {
        weatherIcon.src = `${baseSrc}storm.svg`;
        weatherIcon.alt = `${currentWeatherDescription},cloud with lightning bolt and rain`;
    } else if (currentWeatherCode === 803 || currentWeatherCode === 804) {
        weatherIcon.src = `${baseSrc}overcast.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, cloud icon.`;
    } else if (currentWeatherCode === 800 && !isDay) {
        console.log("here");
        weatherIcon.src = `${baseSrc}moon-clear.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, moon icon.`;
    } else if (
        (currentWeatherCode === 801 || currentWeatherCode === 802) &&
        !isDay
    ) {
        console.log("here too");
        weatherIcon.src = `${baseSrc}moon-and-cloud.svg`;
        weatherIcon.alt = `${currentWeatherDescription}, moon and cloud icon together`;
    }
}

function updateRainfall(data) {
    console.log(data);
    const hourlyDataArray = data.hourly;
    let dailyRainTotal = 0;
    for (var i = 0; i < hourlyDataArray.length; i++) {
        if ("rain" in hourlyDataArray[i]) {
            dailyRainTotal += hourlyDataArray[i].rain["1h"];
        }
    }
    rainfallFigure.textContent = `Rain in\nPast 24h:\n${dailyRainTotal.toFixed(
        2
    )}mm`;
}

updateWeatherWidgets();
