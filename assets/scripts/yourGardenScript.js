// const csvFile = FileAttachment("userPlants.csv");
const submitNicknameButton = document.querySelector(".submit-name-button");
const addPlantButton = document.querySelector(".submit-plant-button");

let datePlantedInput = document.querySelector(".date-planted-input");
const plantNameSelect = document.querySelector(".plant-name-select");
const nicknameInput = document.querySelector(".nickname-input");

const plantsTable = document.querySelector(".users-plants-table");

const harvestHelperApiKeyLH = "bd4b566cf0263ab6ba604004de134f41";

const harvestHelperEndpointAllPlants = `http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${harvestHelperApiKeyLH}`;

function createPlantEntry() {
    let usersPlants = checkLocalStorage();
    let newPlantEntry = {
        plantName: plantNameSelect.options[plantNameSelect.selectedIndex].text,
        // handle "Invalid Date"
        datePlanted: datePlantedInput.value,
        plantId: plantNameSelect.options[plantNameSelect.selectedIndex].value,
    };
    usersPlants.push(newPlantEntry);
    localStorage.setItem("userPlantsList", JSON.stringify(usersPlants));
}

function checkLocalStorage() {
    let userPlantArray = localStorage.getItem("userPlantsList");
    return userPlantArray ? JSON.parse(userPlantArray) : [];
}
function addRowsToTable(usersPlants, apiPlant) {
    document.querySelectorAll(".plant-row").forEach((elem) => elem.remove());
    if (usersPlants) {
        // for every plant in the users local storage
        usersPlants.forEach(function (plant) {
            if (plant.plantId) {
                const urlWithPlantId = `http://harvesthelper.herokuapp.com/api/v1/plants/${
                    plant.plantId / 1
                }:plant_id?api_key=${harvestHelperApiKeyLH}`;
                // create rows and cells, fill their values
                retrievePlants(urlWithPlantId, "optimal_sun", plant);
            }
            return;
        });
    }
}

function setInputStartDate() {
    document.querySelector("#date-planted-input").value = moment().format(
        "MM/DD/YYYY"
    );
}

function createRow(plantApiData, localStoragePlant, property) {
    const newPlantRow = plantsTable.insertRow(-1);
    newPlantRow.className = "plant-row";
    newPlantRow.insertCell().textContent = plantApiData.name;
    newPlantRow.insertCell().textContent = localStoragePlant.datePlanted;
    newPlantRow.insertCell().textContent = plantApiData[property];
}

function retrievePlants(url, property = 0, plantInStorage = false) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("HarvestHelper Api Failed");
        })
        .then(function (data) {
            // if there is a property present, the parent fn is being reused to create rows in the table
            property
                ? createRow(data, plantInStorage, property)
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

function checkForNickname() {
    localStorage.getItem("usersNickname")
        ? (nicknameInput.placeholder =
              "You have a nickname, submit another to overwrite.")
        : (nicknameInput.placeholder = "Enter Your Nickname Here..");
}
setInputStartDate();
checkForNickname();
addRowsToTable(checkLocalStorage());
// this retrieves all plants
retrievePlants(harvestHelperEndpointAllPlants);

// event listener on button, to add plant to your garden
addPlantButton.addEventListener("click", function (event) {
    event.preventDefault();
    createPlantEntry();
    addRowsToTable(checkLocalStorage());
    datePlantedInput.value = "";
});

submitNicknameButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("usersNickname", nicknameInput.value);
    nicknameInput.value = "";
});
