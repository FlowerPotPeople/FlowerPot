const favPlantsList = {
    lewis: {
        title: "Lewis enjoys",
        plants: ["Rhubarb", "rosemary", "Sweet Potato", "Lettuce"]

    },

    Clare: {
        title: "Clare Loves",
        Plants: ["Brussle sprouts", "watermelon", "Broccoli", "Garlic", "Tomatoes"]
    },

    Obby: {
        title: "Obby likes",
        Plants: ["Cucumbers", "Basil", "Sweet corn", "carrots", "Beets"]
    }
}

const harvestHelperImages = "https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/";

callHarvestHelperApi();



function populateFavouritePlantCard(teamFavPlants) {
    for (let i = 0; i <3; i++) {
        const teamMember = favPlantsList[teamFavPlants[i].name];
        const plant = teamFavPlants[i].plant;
        const el = createElementFromString(`
        <div class="card-content">
            <h3> ${teamMember.title} </h3>
            <p> ${plant.name}</p>
            <img src"= ${
                harvestHelperImages + plant.image_url
            }" width="200" alt= "image of ${plant.name}" >
                <p>Prefers <span> ${plant.optimal_sun}</span></p>
                </div>
            `);
            document.getElementById("team-fav-plants").appendChild(el);
    }
}

function callHarvestHelperApi () {
    fetch(
        "http://harvesthelper.herokuapp.com/api/v1/plants?api_key=5e39d34d071acefd116d3ef6db401b76"
    )
    .then((response) => response.json())
    .then(function (data) {
        const teamFavPlants = [];
        for (const name in favPlantsList) {
            const plant = data.find((plant) => {
                return plant.name === favPlantsList[name].plant;
            });
            teamFavPlants.push({name, plant });
        }
        populateFavouritePlantCard(teamFavPlants);
    });
}

function createElementFromString(str) {
    const template = document.createElement("div");
    template.innerHTML = str;
    return template.children[0];
}

 
