// TODO:
// - on click will show new page with more favourites

const favPlantsList = {
  lewis: {
    title: "Lewis enjoys",
    plants: ["Rhubarb", "Rosemary", "Sweet Potato", "Lettuce", "Chives"],
  },
  clare: {
    title: "Clare loves",
    plants: [
      "Brussels Sprouts",
      "Watermelon",
      "Broccoli",
      "Garlic",
      "Tomatoes",
    ],
  },
  obby: {
    title: "Obby likes",
    plants: ["Cucumbers", "Basil", "Sweet Corn", "Carrots", "Beets"],
  },
};

const harvestHelperImages =
  "https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/";

callHarvestHelperApi();

function populateFavouritePlantCard(teamFavPlants) {
  for (let i = 0; i < 3; i++) {
    const teamMember = favPlantsList[teamFavPlants[i].name];
    const plant = teamFavPlants[i].plant;
    const el = createElementFromString(`
      <div class="card-content fav-content">
        <h3>${teamMember.title}</h3>
        <p>${plant.name}</p>
        <img src="${
          harvestHelperImages + plant.image_url
        }" width="200" alt="image of ${plant.name}">
        <p>Prefers <span>${plant.optimal_sun}</span></p>
      </div>
    `);
    document.getElementById("team-fav-plants").appendChild(el);
  }
}

function callHarvestHelperApi() {
  fetch(
    "https://harvesthelper.herokuapp.com/api/v1/plants?api_key=5bbf7f6a0d2a91ea29a665bbbd787fd5"
  )
    .then((response) => response.json())
    .then(function (data) {
      const teamFavPlants = [];
//       console.log("fullset data: ", data);
      for (const name in favPlantsList) {
        const plant = data.find((plant) => {
          return plant.name === favPlantsList[name].plants[0];
        });
        teamFavPlants.push({ name, plant });
      }
//       console.log("teamFavPlants: ", teamFavPlants);
      populateFavouritePlantCard(teamFavPlants);
    });
}

function createElementFromString(str) {
  const template = document.createElement("div");
  template.innerHTML = str;
  return template.children[0];
}
