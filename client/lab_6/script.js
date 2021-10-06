const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurant = [];

fetch(endpoint).then((blob) => blob.json()).then((data) => restaurant.push(...data));

function findMatches(word, restaurant) {
  return restaurant.filter(food => {

    const regex = new RegExp(word, 'gi');
    return food.zip.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurant);
  const html = matchArray.map(food => {
      return `
      <li>
        <span class = 'name'>${food.name}<br></span>
        <span class = 'address1'>${food.address_line_1}<br></span>
        <span class = 'citystate'>${food.city}, ${food.state}<br></span>
        <span class = 'zipcode'>${food.zip}</span>
      </li><br>
      `;
  }).join('');
  result.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const result = document.querySelector('.results');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);