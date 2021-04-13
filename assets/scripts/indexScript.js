function gardenNickname() {
    const yourGardenHeader = document.querySelector(".your-garden-header");
    const usersNickname = localStorage.getItem("usersNickname");
    console.log(usersNickname);
    usersNickname &&
        (yourGardenHeader.textContent = `${capitaliseString(
            usersNickname
        )}'s Garden`);
}
function capitaliseString(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

gardenNickname();
