function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
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
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = dataHandler();