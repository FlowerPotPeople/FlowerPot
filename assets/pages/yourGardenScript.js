// const csvFile = FileAttachment("userPlants.csv");
const submitNicknameButton = document.querySelector(".submit-name-button");
const addPlantButton = document.querySelector(".submit-plant-button");

let plantNameInput = document.querySelector(".plant-name-input");
let datePlantedInput = document.querySelector(".date-planted-input");
const plantNameSelect = document.querySelector(".plant-name-select");

const harvestHelperApiKeyLH = "bd4b566cf0263ab6ba604004de134f41";

const harvestHelperEndpoint = `http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${harvestHelperApiKeyLH}`;

function createPlantEntry() {
    let usersPlants = checkLocalStorage();
    let newPlantEntry = {
        plantName: plantNameInput.value,
        datePlanted: datePlantedInput.value,
        estimatedHarvest:
            this.datePlanted + estimatedHarvestDate(this.plantName),
    };
    usersPlants.push(newPlantEntry);
    localStorage.setItem("userPlantsList", JSON.stringify(usersPlants));
}

function estimatedHarvestDate(plantName) {
    // make a request to treffle using plant name
    // return growth time
}

function checkLocalStorage() {
    let userPlantArray = localStorage.getItem("userPlantsList");
    return userPlantArray ? JSON.parse(userPlantArray) : [];
}
function addPlanmtSubmit(event) {
    event.target;
}

function addRowsToTable(usersPlants) {
    let plantsTable = document.querySelector(".users-plants-table");
    for (let i = 0; i < usersPlants.length; i++) {
        let newRow = plantsTable;
    }
}

addPlantButton.addEventListener("click", function (event) {
    event.preventDefault();
    createPlantEntry();
    plantNameInput.value = "";
    datePlantedInput.value = "";
});

function retrievePlants(url, apiKey) {
    fetch(url)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error("HarvestHelper Api Failed");
        })
        .then(function (data) {
            console.log(data[0]);
            data.forEach((element) => createDropown(element));
        });
}
function createDropown(data) {
    const newOption = document.createElement("option");
    newOption.textContent = data.name;
    newOption.value = data.id;
    plantNameSelect.appendChild(newOption);
}

retrievePlants(harvestHelperEndpoint);
