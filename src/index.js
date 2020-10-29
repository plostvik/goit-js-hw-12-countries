import css from "./css/style.css";
import fetchCountries from "./fetchCountries.js";
import countryTemplate from "./countryTemplate.hbs";

var debounce = require("lodash.debounce");
const search = document.querySelector(".search");
const countryList = document.querySelector(".country-list");
const countryDiv = document.querySelector(".country-wrapper");

const render = function (event) {
  countryList.innerHTML = "";
  countryDiv.innerHTML = "";
  let result;
  if (event.target.value !== "") {
    result = fetchCountries(event.target.value);
    result.then((result) => {
      if (result) {
        if (result.length >= 2 && result.length <= 10) {
          result.forEach((el) => {
            countryList.innerHTML += `<li class="country-list-item">${el.name}</li>`;
          });
          countryList.addEventListener("click", (event) => {
            search.value = event.target.textContent;
            result.forEach((el) => {
              if (el.name === event.target.textContent) {
                countryList.innerHTML = "";
                countryDiv.innerHTML = countryTemplate(el);
              }
            });
          });
        } else {
          countryDiv.innerHTML = countryTemplate(result[0]);
        }
      }
    });
  }
};

search.addEventListener(
  "input",
  debounce((event) => render(event), 500),
);
