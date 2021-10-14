function mapInit() {
  const mymap = L.map('mapid').setView([38.98582939, -76.937329584], 14);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoibm51a2t5IiwiYSI6ImNrdXBtYXJ1NjRtazEycW56MzlmZmMxMmIifQ.CpxpF7AWl9rX_5fsi4mrJA'
  }).addTo(mymap);

  return mymap;
}

async function dataHandler(map) {
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
    const markers = L.layerGroup().addTo(map);
    let matchArray = [];
    matchArray = findMatches(event.target.value, restaurant);
    matchArray = matchArray.slice(0, 5);
    let locationArr = matchArray.map(item => item.geocoded_column_1.coordinates);
    locationArr = locationArr.map(item => item.reverse());
    markers.clearLayers();
    map.panTo([locationArr[0][0], locationArr[0][1]]);
    L.marker([locationArr[0][0], locationArr[0][1]]).addTo(markers);
    L.marker([locationArr[1][0], locationArr[1][1]]).addTo(markers);
    L.marker([locationArr[2][0], locationArr[2][1]]).addTo(markers);
    L.marker([locationArr[3][0], locationArr[3][1]]).addTo(markers);
    L.marker([locationArr[4][0], locationArr[4][1]]).addTo(markers);
    const html = matchArray.map(food => `
        <div class = finalResult>
            <span class = 'name'><strong>${food.name}</strong><br></span>
            <em><span class = 'address1'>${food.address_line_1}<br></span>
            <span class = 'citystatezip'>${food.city}, ${food.state} ${food.zip}<br></span>
        </div>
        `).join('');
    result.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const result = document.querySelector('.results');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('submit', (evt) => {displayMatches(evt)});
}

function windowActions() {
  const myMap = mapInit();
  dataHandler(myMap);
}

window.onload = windowActions;