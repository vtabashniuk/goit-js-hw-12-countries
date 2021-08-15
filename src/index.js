import { debounce } from 'lodash';
import './sass/main.scss';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

function tooMuch() {
  alert({
    text: 'Too many matches found! Please enter a more specific query!',
  });
}

const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
const countryRef = document.querySelector('.country');
const searchForm = document.querySelector('[name=country_search]');

const onInputChangeDebounced = debounce(event => {
  console.log(event.target.value);
  const countryName = event.target.value;
  fetch(`${BASE_URL}${countryName}`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      if (country.length > 10 || country.length < 1) {
        tooMuch();
      } else if (country.length < 11 && country.length > 1) {
        countryRef.innerHTML = '';
        countryRef.insertAdjacentHTML('afterbegin', countryList(country));
      } else {
        countryRef.innerHTML = '';
        countryRef.insertAdjacentHTML('afterbegin', countryCard(country));
      }
    });
}, 2000);

searchForm.addEventListener('input', onInputChangeDebounced);
