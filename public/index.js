window.addEventListener("load", () => {
    let long;
    let lati;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature")
    let temperatureSpan = document.querySelector(".temperature span")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lati = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/a519cf86f75cf0ed5756065a7feb06a5/${lati},${long}`;

            // Headers, i want to fetch the information from the API using the javascript fetch method
            fetch(api)
                // After getting the information from the API, i will then turn it to a json file so i can easily access it
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    //   Here, i am setting DOM element from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // setting my icon
                    setIcons(icon, document.querySelector(".icon"));

                    // Formular for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    // changing temperatureto celsuis or farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    } else {
        h1.textContent = "Allow this app to view your location!!!";
    }

    // This is for the weather icons on the webpage. Making use of skycons
    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
}); 