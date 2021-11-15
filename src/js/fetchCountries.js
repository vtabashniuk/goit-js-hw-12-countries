export default function fetchCountries(BASE_URL, countryName) {
  return fetch(`${BASE_URL}${countryName}`).then(response => {
    return response.json();
  });
}
