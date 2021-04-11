// TODO:
// Its a good time to plant Card:
// template to show what is good to plant right now for the user.
// - link to a new page to show more results
// - given weather & month list out appropriate plants for planting with recommendations on
// - sun/shade requirement,
// - avg spread and height of plant,
// - planting description?
// - see if we can get an image and alt tag

populateFavouritePlants();
// callTrefleApi();
function populateFavouritePlants() {
  for (let i = 0; i < 3; i++) {
    const el = createElementFromString(`
      <div class="card-content" >
        <h3>${title}</h3>
        <p>${plantName}</p>
        <img src=${
          harvestHelperImages + imgUrl
        } width="200" alt="image of plant ${plantName}">
        <p>Prefers <span>${sunPreference}</span></p>
      </div>
    `);
    document.getElementById("team-fav-plants").appendChild(el);
  }
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
  obby: { title: "Obby likes", plants: [] },
};
const teamFavPlants = [];

const harvestHelperImages =
  "https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/";

callHarvestHelperApi();

function callHarvestHelperApi() {
  fetch(
    "http://harvesthelper.herokuapp.com/api/v1/plants?api_key=5bbf7f6a0d2a91ea29a665bbbd787fd5"
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      for (const property in favPlants) {
        teamFavPlants.push(favPlants[property].plants[0]);
      }
      console.log(teamFavPlants);
      const favPlantInfo = data.filter((plant) => {
        return teamFavPlants.includes(plant.name);
      });
      console.log(favPlantInfo);

      // const plantName = document.getElementById("plant-name");
      // plantName.innerHTML = favPlantInfo["name"];
      // const img = document.getElementById("suitablePlantImg");
      // img.src = harvestHelperImages + favPlantInfo["image_url"];
      // img.alt = `Image of a ${favPlantInfo["name"]}`;
      // document.getElementById("sunPreference").innerHTML =
      // favPlantInfo["optimal_sun"];
    });
}
