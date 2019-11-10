const endpoint =
  "./countries.json";
const cities = [];

fetch(endpoint)
  .then(blob => blob.json()
  .then(data=> cities.push(...data)));
function findMatch(word,cities) {
  return cities.filter(place=>{
    const regex = new RegExp(word,`gi`)
    return place.name.match(regex) || place.capital.match(regex)
  })
}
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}
function displayMatches(){
  const matchArray = findMatch(this.value, cities)
  const html = matchArray.map(place=>{
    const reqex = new RegExp(this.value, `gi`)
    const cityName = place.name.replace(reqex,`<span class="hl">${this.value}</span>`)
    const stateName = place.capital.replace(reqex,`<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span> 
      <span class="papulation">+${place.phone}</span>
    </li>
    `
  }).join('');
  suggestion.innerHTML = html
}

const searchInput = document.querySelector(`.search`)
const suggestion = document.querySelector(`.suggestions`)

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)