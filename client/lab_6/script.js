async function windowActions() {
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
    const html = matchArray.map(food => {
        return `
        <li>
            <span class = 'name'>${food.name}<br></span>
            <em><span class = 'address1'>${food.address_line_1}<br></span>
            <span class = 'citystate'>${food.city}, ${food.state}<br></span>
            <span class = 'zipcode'>${food.zip}</span></em>
        </li><br>
        `;
    }).join('');
    result.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const result = document.querySelector('.results');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});
};

window.onload = windowActions();