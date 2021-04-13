const favPlantsList = {
    Lewis: {
      title: 
      "Lewis enjoys",
      plants: [
          "Rhubarb", 
          "Rosemary", 
          "Sweet Potato", 
          "Lettuce", 
          "Chives"
        ],
    },
    Clare: {
      title: "Clare loves",
      plants: [
        "Brussels Sprouts",
        "Watermelon",
        "Broccoli",
        "Garlic",
        "Tomatoes",
      ],
    },
    Obby: {
         title: 
         "Obby likes", 
         plants: [
             "Beets",
             "Basil",
             "Cucumber",
             "Sweet Corn",
             "Carrots"   
            ] },
  };
  
  const harvestHelperImages =
    "https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/";
  
  callHarvestHelperApi();

  function populateFavouritePlantCard(teamFavPlants) {
    for (let i = 0; i < 15 ; i++) {
      const teamMember = favPlantsList[teamFavPlants[i].name];
      const plant = teamFavPlants[i].plant;
      const el = createElementFromString(`
        <div class="card-content">
          <h3>${teamMember.title}</h3>
          <p>${plant.name}</p>
          <img src="${
            harvestHelperImages + plant.image_url
          }" width="150" alt="image of ${plant.name}">
          <p>Prefers <span>${plant.optimal_sun}</span></p>
        </div>
      `);
      document.getElementById("team-fav-plants").appendChild(el);
    }
  }


  function callHarvestHelperApi()
  {
    fetch(
      "http://harvesthelper.herokuapp.com/api/v1/plants?api_key=5bbf7f6a0d2a91ea29a665bbbd787fd5"
    )
    Promise.all(["Lewis", "Clare", "Obby"])
    .then(values => {
        console.log(values);
    })
    .catch(error => {
        console.error(error.message)
    });
      then((response) => response.json())
      .then(function (data) {
        const teamFavPlants = [];
        // console.log("fullset data: ", data);
        for (const name in favPlantsList) {
          const plant = data.find((plant) => {
            return plant.name === favPlantsList[name].plants[0];
          });
          teamFavPlants.push({ name, plant });
        }
        // console.log("teamFavPlants: ", teamFavPlants);
        populateFavouritePlantCard(teamFavPlants);
      });
  }


  
  function createElementFromString(str) {
    const template = document.createElement("div");
    template.innerHTML = str;
    return template.children[0];
  }