// TODO:
// Team Favourites plant Card:
// template to show the first favourite plant of each team memeber containing:
// - plant name
// - sun/shade requirement,
// - image and alt tag
// - on click will show new page with more favourites

const favPlants = {
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
  obby: { title: "Obby likes", plants: ["Beets"] },
};

const harvestHelperImages =
  "https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/";

callHarvestHelperApi();

function populateFavouritePlants(teamFavPlants) {
  for (let i = 0; i < 3; i++) {
    const teamMember = favPlants[teamFavPlants[i].name];
    const plant = teamFavPlants[i].plant;
    const el = createElementFromString(`
      <div class="card-content">
        <h3>${teamMember.title}</h3>
        <p>${plant.name}</p>
        <img src="${
          harvestHelperImages + plant.image_url
        }" width="200" alt="image of plant ${plant.name}">
        <p>Prefers <span>${plant.optimal_sun}</span></p>
      </div>
    `);
    document.getElementById("team-fav-plants").appendChild(el);
  }
}

function callHarvestHelperApi() {
  fetch(
    "http://harvesthelper.herokuapp.com/api/v1/plants?api_key=5bbf7f6a0d2a91ea29a665bbbd787fd5"
  )
    .then((response) => response.json())
    .then(function (data) {
      const teamFavPlants = [];
      console.log("fullset data: ", data);
      for (const name in favPlants) {
        const plant = data.find((plant) => {
          return plant.name === favPlants[name].plants[0];
        });
        teamFavPlants.push({ name, plant });
      }
      console.log("teamFavPlants: ", teamFavPlants);

      populateFavouritePlants(teamFavPlants);
    });
}

function createElementFromString(str) {
  const template = document.createElement("div");
  template.innerHTML = str;
  return template.children[0];
}

// function callTrefleApi() {
//   // call the trefle API using proxy server to avoid CORS issue
//   fetch(
//     `http://150.107.74.186:8083/api/v1/species?token=6wXXUz15oApy79g55Iy223zZRQZHQk7h9WbHXDFldl0`
//   )
//     .then((response) => response.json())
//     .then(function (data) {
//       console.log(data);
//       // const plantName = document.getElementById("plant-name");
//       // plantName.innerHTML = data.data[11]["common_name"];
//       // const img = document.getElementById("suitablePlantImg");
//       // img.src = data.data[11]["image_url"];
//       // img.alt = `Image of a ${data.data[11]["common_name"]}`;
//       fetch(
//         `http://150.107.74.186:8083/api/v1/species/1056117?token=6wXXUz15oApy79g55Iy223zZRQZHQk7h9WbHXDFldl0`
//       )
//         .then((response) => response.json())
//         .then(function (data) {
//           console.log(data);
//           const plantName = document.getElementById("plant-name");
//           plantName.innerHTML = data.data["common_name"];
//           const img = document.getElementById("suitablePlantImg");
//           img.src = data.data["image_url"];
//           img.alt = `Image of a ${data.data["common_name"]}`;
//           document.getElementById("sunPreference").innerHTML =
//             data.data.growth.light;
//           document.getElementById("plantHeight").innerHTML =
//             data.data.specifications.average_height.cm / 100;
//           document.getElementById("plantSpan").innerHTML =
//             data.data.growth.spread.cm;
//         });
//     });
// }
