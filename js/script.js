import * as bootstrap from 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/style.sass'

const city = document.querySelector(`.city__items span`),
      citys = document.querySelectorAll(`.city__items__link`),
      parentLinks = document.querySelector(`.city__items ul`),
      links = document.querySelectorAll(`.city__items__link a`),
      parentDegrees = document.querySelector(`.degrees`),
      degrees = parentDegrees.querySelector(`.degrees__1`),
      fahrenheit = parentDegrees.querySelector(`.degrees__2`),
      wind = document.querySelector(`.footer-wrap .footer-wrap__wind-descr span`),
      windMaxWidth = document.querySelector(`.footer-wrapMaxWidth__1 .footer-wrap__wind-descr span`),
      pressure = document.querySelector(`.footer-wrap .footer-wrap__pressure-descr span`),
      pressureMaxWidth = document.querySelector(`.footer-wrapMaxWidth__1 .footer-wrap__pressure-descr span`),
      humidity = document.querySelector(`.footer-wrap .footer-wrap__humidity-descr span`),
      humidityMaxWidth = document.querySelector(`.footer-wrapMaxWidth__2 .footer-wrap__humidity-descr span`),
      tempInfoImg = document.querySelector(`.temp-info img`),
      tempInfoNumber = document.querySelector(`.temp-info__number span`),
      tempDescr = document.querySelector(`.temp-descr`),
      headerWrapCityItemsSpan = document.querySelector(`.header .wrap .city__items span`);
// console.log(wind);

const weather = id => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=43fe65be98bee3fe76d2b838c337656a&lang=ru`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const temp = Math.round(data.main.temp - 273);
        wind.textContent = data.wind.speed;
        windMaxWidth.textContent = data.wind.speed;
        tempInfoImg.setAttribute(`src`, `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        tempInfoNumber.textContent = temp;
        tempDescr.textContent = data.weather[0].description;
        pressure.textContent = data.main.pressure;
        pressureMaxWidth.textContent = data.main.pressure;
        humidity.textContent = data.main.humidity;
    });
}



document.addEventListener(`click`, (e) => {
    const computedStyle = window.getComputedStyle(parentLinks).display;
    if (e.target !== city & computedStyle === `block`) {
        parentLinks.style.display = ``;
    }
})

city.addEventListener(`click`, (e) => {
    const computedStyle = window.getComputedStyle(parentLinks).display;
    parentLinks.style.display = `block`;

    if (computedStyle === `block`) {
        parentLinks.style.display = ``;
    }
});

parentDegrees.addEventListener(`click`, (e) => {
    const target = e.target;

    if (target == degrees) {
        fahrenheit.style.cssText = `
            opacity: .4;
            background: #498CEC;
        `;

        degrees.style.cssText = `
            background-color: rgb(109,163,240);
            opacity: 1;
        `;

        const temp = tempInfoNumber.textContent;
        const grad = (temp - 32) / 1.8;
        tempInfoNumber.textContent = Math.round(grad);
    }

    if (target == fahrenheit) {
        degrees.style.cssText = `
            opacity: .4;
            background: #498CEC;
        `;

        fahrenheit.style.cssText = `
            background-color: rgb(109,163,240);
            opacity: 1;
        `;

        const temp = tempInfoNumber.textContent;

        const fahren  = (temp * 1.8) + 32;

        tempInfoNumber.textContent = Math.round(fahren);
    }
});


links.forEach((link, index) => {
    link.addEventListener(`click`, (e) => {
        const target = e.target;
        const id = link.getAttribute(`id`);
        fahrenheit.style.cssText = `
            opacity: .4;
            background: #498CEC;
        `;

        degrees.style.cssText = `
            background-color: rgb(109,163,240);
            opacity: 1;
        `;
        // console.log(id);
        headerWrapCityItemsSpan.textContent = link.textContent;
        parentLinks.style.display = ``;
        weather(id);
    });
});