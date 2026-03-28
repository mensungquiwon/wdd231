// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.63&unit=imperial&appid=Quiwon';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
        } else {
            throw error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }

}
apiFetch()