let albumUnici = 0;

window.onload = () => {   
    let initialString = "pinguini%20tattici%20nucleari";
    addToSearchDiv(initialString);
    
}



function search() {
    let searchField = document.getElementById("searchField");
    if (searchField.value) {
        addToSearchDiv(searchField.value);
        searchField.value = ""
    }
}

function insertInModal(songs){
    let albumList = document.getElementById("album-list"); 
    albumList.innerHTML = "";
    songs.forEach(song => {
        let li = document.createElement("li")
        li.innerText = song.album.title;
        albumList.appendChild(li);
    });
}

function addToSearchDiv(string){
    let searchDiv = document.getElementById("searchResults");
    let searchResults = searchDiv.querySelector("div");
    searchResults.innerHTML = "";
    let spinnerDiv = document.createElement("div");
    spinnerDiv.classList.add("spinner-border");
    spinnerDiv.role = "status";
    let spinnerSpan = document.createElement("span");
    spinnerSpan.classList.add("sr-only");
    spinnerSpan.innerText = "Loading..."
    spinnerDiv.appendChild(spinnerSpan);
    searchDiv.appendChild(spinnerDiv);
    fetchAlbums(string).then(
        songs => {
            spinnerDiv.remove();
            console.log(songs)
            albumUnici = uniciArrLength(songs);
            insertInModal(songs);
            for (let song of songs) {
                searchResults.appendChild(createCard(song));
            }
        }
    );
}

function uniciArrLength(songs) {
    let uniciArr = [];
    songs.forEach(song => {
        if (uniciArr.indexOf(song.album.title)=== -1) {
            uniciArr.push(song.album.title)
        }
    })
    return uniciArr.length;
}

function printUnici(){
    console.log(albumUnici);
}

function fetchAlbums(string){
    return fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + string)
    .then(response => response.json())
    .then(response => response.data)
}

function createCard(element){
    let colDiv = document.createElement("div");
    let cardDiv = document.createElement("div");
    let img = document.createElement("img");
    img.classList.add("img-fluid")
    img.src = element.album.cover_medium;
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardBodyDiv.classList.add("bg-dark");
    cardBodyDiv.classList.add("p-2");
    let cardTitle = document.createElement("h6");
    cardTitle.classList.add("card-title")
    cardTitle.classList.add("text-truncate")
    cardTitle.innerText = element.title;
    cardBodyDiv.appendChild(cardTitle);
    cardDiv.classList.add("card");
    cardDiv.classList.add("mb-4");
    colDiv.classList.add("col");
    cardDiv.append(img, cardBodyDiv);
    colDiv.appendChild(cardDiv);
    return colDiv;
}