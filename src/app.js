window.addEventListener('load',()=>{
    let long;
    let lat;
    
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;

               //acts as a proxy and allows us to make request from local host
               const proxy = 'https://cors-anywhere.herokuapp.com/';
               const api = `${proxy}https://api.darksky.net/forecast/bf17cc01863d5546e2faa9949b8bd91f/${lat},${long}`;

               fetch(api)
               .then(res =>{
                   return res.json();
               })
               .then(data=>{
              
                   //extract data from the {} shorthand
                   const {temperature, summary, icon} = data.currently;
                   //set DOM elements from the API
                   console.log(temperatureDegree)
                   temperatureDegree.textContent = temperature;
                   temperatureDescription.textContent = summary;
                  locationTimezone.textContent = data.timezone;
                  //set Icon
                  setIcons(icon, document.querySelector('.icon'));

               });
            });   
    }

function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    //looks for every dash with underscore
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

}

});