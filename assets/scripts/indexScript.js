function gardenNickname() {
    const yourGardenHeader = document.querySelector(".your-garden-header");
    const usersNickname = localStorage.getItem("usersNickname");
    console.log(usersNickname);
    usersNickname &&
        (yourGardenHeader.textContent = `${capitaliseString(
            usersNickname
        )}'s Garden`);
}
gardenNickname();
