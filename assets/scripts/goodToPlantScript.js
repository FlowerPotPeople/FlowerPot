// TODO:
// Its a good time to plant Card:
// template to show what is good to plant right now for the user.
// - link to a new page to show more results
// - given weather & month list out appropriate plants for planting with recommendations on
// - sun/shade requirement,
// - avg spread and height of plant,
// - planting description?
// - see if we can get an image
populateSuitablePlants();

function populateSuitablePlants() {
  for (let i = 0; i < 4; i++) {
    const el = createElementFromString(`
    <div id="suitableForPlanting" class="card-content plants">
      <p>{Plant name}</p>
      <img src="assets/images/background image.jpeg" width="150" alt="image of plant">
      <p>Prefers <span>{full sun}</span></p>
      <p>Average height is <span>{1 meter}</span></p>
      <p>Average span of <span>{plant name}</span> is <span>{50 cm}</span></p>
    </div>
    `);
    // if (fruit || vegetable) {
    //   const edible = createElementFromString(
    //     `<p>**This plant bears fruit or may be edible**</p>`
    //   );
    //   document.getElementById("suitableForPlanting").appendChild(edible);
    // }
    document.getElementById("good-to-plant").appendChild(el);
  }
}

function createElementFromString(str) {
  const template = document.createElement("div");
  template.innerHTML = str;
  return template.children[0];
}
