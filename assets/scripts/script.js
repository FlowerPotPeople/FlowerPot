// defines selected elements in varibales for reuse throughout this script
let weatherIcon = document.querySelector('.weather-icon');
let rainfallFigure = document.querySelector('.rainfall-figure');

let rainfallFigureContent = rainfallFigure.textContent;
let weatherIconSource = weatherIcon.src

const weatherApiKey = '7e5922ef7f6bc85e485e53b28667f43a'



function updateWeatherWidgets(){
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(userPosition){
        let userCoordinatesResponseObject = userPosition.coords;
        let userCoordinatesObject = {
            usersLatitude:userCoordinatesResponseObject.latitude,
            usersLongitude:userCoordinatesResponseObject.longitude
        };
        let userCoordinatesArray = [userCoordinatesObject.usersLongitude,userCoordinatesObject.usersLatitude]
        getWeather(weatherApiKey,userCoordinatesArray,'minutely')
        updateRainFallAmount(weatherApiKey,userCoordinatesArray,'minutely')
    };
    function error(err){
        // TODO: handle errors
        console.warn(`ERROR(${err.code}): ${err.message}`)
        
    };
    navigator.geolocation.getCurrentPosition(success,error,options,true) 

};

function getWeather(apiKey,coords,excludeParams){
    const lon = coords[0]
    const lat = coords[1]
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${apiKey}&units=metric`

    
    fetch(weatherApiUrl)
        .then(function(response) {
            if(response.ok){
                const responseJSON = response.json()
                return responseJSON
            } else {
                // handle errors
                console.log('handleing')
            }
            
        })
        .then(function(data){
            console.log(data)
            // data.current.weather[0].description  -- gives a description of weather -- use description to pick an icon
        })
    
    
};


function useWeatherObj(weatherObj){
    // this funciton will conaint the DOM manipulation based on the response.json()
    console.log(weatherObj)

}
function updateWeatherIcon(){
};

function updateRainFallAmount(apiKey,coords,excludeParams){
    const lon = coords[0]
    const lat = coords[1]

    // const yesterdayUnix = (moment().unix()-(86400)*5) / 1  eg of day when rain
    const yesterdayUnix = (moment().unix()-(86400 / 1)) / 1
    console.log(yesterdayUnix)
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&exclude=${excludeParams}&appid=${apiKey}&units=metric&dt=${yesterdayUnix}`
        
    fetch(weatherApiUrl)
        .then(function(response) {
            if(response.ok){
                const responseJSON = response.json()
                return responseJSON
            } else {
                // handle errors
                console.log('handleing')
            }
            
        })
        .then(function(data){
            console.log(data)
            const hourlyDataArray = data.hourly
            let dailyRainTotal = 0
            for (var i= 0; i< hourlyDataArray.length;i++){
                if('rain' in hourlyDataArray[i]){
                    dailyRainTotal += hourlyDataArray[i].rain['1h']
                }
            };
            rainfallFigure.textContent = `Rain in\nPast 24h:\n${dailyRainTotal.toFixed(2)}mm`
        });
    
};

// getUsersLocation();

updateWeatherWidgets();