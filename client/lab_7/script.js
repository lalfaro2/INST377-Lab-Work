function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoibm51a2t5IiwiYSI6ImNrdXBtYXJ1NjRtazEycW56MzlmZmMxMmIifQ.CpxpF7AWl9rX_5fsi4mrJA'
  }).addTo(mymap);
}

mapInit();

async function dataHandler() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const restaurant = await request.json();

  function findMatches(word, restaurant) {
    return restaurant.filter(food => {
      const regex = new RegExp(word, 'gi');
      return food.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurant);
    const html = matchArray.map(food => `
        <li>
            <span class = 'name'>${food.name}<br></span>
            <em><span class = 'address1'>${food.address_line_1}<br></span>
            <span class = 'citystate'>${food.city}, ${food.state}<br></span>
            <span class = 'zipcode'>${food.zip}</span></em>
        </li><br>
        `).join('');
    result.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const result = document.querySelector('.results');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('submit', (evt) => {displayMatches(evt)});
}

window.onload = dataHandler();