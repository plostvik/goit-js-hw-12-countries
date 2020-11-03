import { error } from "../node_modules/@pnotify/core/dist/PNotify.js";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/mobile/dist/PNotifyMobile.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";

export default function (searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      if (response.length > 10) {
        error({
          delay: 300,
          text: "Too many matches found. Please enter a more specific query",
        });
      } else return response;
    })
    .catch(() => {
      error({
        delay: 300,
        text: "Error can't find country with this name",
      });
    });
}
