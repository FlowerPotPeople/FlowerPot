// const csvFile = FileAttachment("userPlants.csv");
const submitNicknameButton = document.querySelector(".submit-name-button");
const addPlantButton = document.querySelector(".submit-plant-button");

let plantNameInput = document.querySelector(".plant-name-input");
let datePlantedInput = document.querySelector(".date-planted-input");
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
    console.log(userPlantArray);
    if (userPlantArray) {
        return JSON.parse(userPlantArray);
    } else {
        let userPlantArray = [];
        return userPlantArray;
    }
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
