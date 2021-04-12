// const csvFile = FileAttachment("userPlants.csv");
const submitNicknameButton = document.querySelector(".submit-name-button");
const addPlantButton = document.querySelector(".submit-plant-button");

let datePlantedInput = document.querySelector(".date-planted-input");
const plantNameSelect = document.querySelector(".plant-name-select");

const harvestHelperApiKeyLH = "bd4b566cf0263ab6ba604004de134f41";

const harvestHelperEndpointAllPlants = `http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${harvestHelperApiKeyLH}`;

function createPlantEntry() {
    let usersPlants = checkLocalStorage();
    let newPlantEntry = {
        plantName: plantNameSelect.options[plantNameSelect.selectedIndex].text,
        // handle "Invalid Date"
        datePlanted: moment(datePlantedInput.value).format("DD/MM/YY"),
        plantId: plantNameSelect.options[plantNameSelect.selectedIndex].value,
    };
    usersPlants.push(newPlantEntry);
    localStorage.setItem("userPlantsList", JSON.stringify(usersPlants));
}

function checkLocalStorage() {
    let userPlantArray = localStorage.getItem("userPlantsList");
    return userPlantArray ? JSON.parse(userPlantArray) : [];
}
function addRowsToTable(usersPlants) {
    let plantsTable = document.querySelector(".users-plants-table");
    if (usersPlants) {
        // for every plant in the users local storage
        usersPlants.forEach(function (plant) {
            const urlWithPlantId = `http://harvesthelper.herokuapp.com/api/v1/plants/${
                plant.plantId / 1
            }:plant_id?api_key=${harvestHelperApiKeyLH}`;
            // create rows and cells, fill their values
            const newPlantRow = plantsTable.insertRow(-1);
            newPlantRow.insertCell().textContent = plant.plantName;
            newPlantRow.insertCell().textContent = plant.datePlanted;
            console.log(plant.plantId);
            newPlantRow.insertCell().textContent = retrievePlants(
                urlWithPlantId,
                "optimal_sun"
            );
            console.log(plant.plantId);
            console.log(plant["optimal_sun"]);
            console.log(plant);
        });
    }
}

function retrievePlantPropety(plantId, property) {
    const urlWithPlantId = `http://harvesthelper.herokuapp.com/api/v1/plants/${
        plantId / 1
    }:plant_id?api_key=${harvestHelperApiKeyLH}`;
    console.log(urlWithPlantId);
    const plantRecieved = retrievePlants(urlWithPlantId, true);
    console.log(`plantRevieced var ${plantRecieved}`);
    return plantRecieved[property];
}
// retrievePlantPropety(plant.plantId, "optimal_sun");

addPlantButton.addEventListener("click", function (event) {
    event.preventDefault();
    createPlantEntry();
    datePlantedInput.value = "";
});

function retrievePlants(url, property = 0) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("HarvestHelper Api Failed");
        })
        .then(function (data) {
            property
                ? console.log(data[property])
                : data.forEach((element) => createDropown(element));
        })
        .catch(function (err) {});
}
function createDropown(data) {
    const newOption = document.createElement("option");
    newOption.textContent = data.name;
    newOption.value = data.id;
    plantNameSelect.appendChild(newOption);
}

addRowsToTable(checkLocalStorage());

// this call is for the dropdown menu
retrievePlants(harvestHelperEndpointAllPlants);
