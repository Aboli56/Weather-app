
const api ={
    key : "52c1f71d6c9c8cd11b597974bcf6b333" ,
    baseUrl : "https://api.openweathermap.org/data/2.5/weather"
}

let searchInputBox = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let img =document.getElementById("temp-icon");
let city = document.getElementById("location");
let date = document.getElementById("date");
let min_max = document.getElementById("min-max");
let temp = document.getElementById("temp-value");
let temp_unit = document.getElementById("temp-unit");
let weatherType = document.getElementById("climate");
searchButton.addEventListener("click", (e)=>{
    e.preventDefault();
    city.innerText= "Loading.....";
        getWeatherReport(searchInputBox.value);
       
        setTimeout(()=>{
            if(city.innerText==="Loading....."){
            min_max.innerText="Oopps!!City not Found...";
            city.innerText="";
            date.innerText="";
            temp.innerText="";
            weatherType.innerText="";
            temp_unit.innerText="";
            img.src="https://t3.ftcdn.net/jpg/02/60/08/54/240_F_260085400_jmT8Hk8UcVjbsgvOLj0b14v0BxGk9Qdi.jpg";
            }
        },1000)
       
    searchInputBox.value = '';
})
function getWeatherReport(city){
    fetch(`${api.baseUrl}?q=${city}&appid=${api.key}&units=metric`)
    .then(weather => {
        return weather.json();
       
    }).then(showWeatherReport);
}
function showWeatherReport(weather){
   console.log(weather)
   let city = document.getElementById("location");
   city.innerText =`${weather.name} , ${weather.sys.country}`;
   let temp = document.getElementById("temp-value");
   temp.innerHTML =`${Math.round(weather.main.temp)}`;
   let min_max = document.getElementById("min-max");
   min_max.innerHTML =`${Math.floor(weather.main.temp_min)}&deg;c (min) / ${Math.ceil(weather.main.temp_max)}&deg;c (max)`;
   let weatherType = document.getElementById("climate");
   weatherType.innerHTML = `${weather.weather[0].main}`;
   let date = document.getElementById("date");
   let todayDate = new Date();
   date.innerHTML = dateManage(todayDate);
   if(weather.weather[0].main=="Clouds"){
    img.src="climate-img/cloudy.png";
   }else if(weather.weather[0].main=="Haze"){
    img.src="climate-img/Haze.webp";
   }else if(weather.weather[0].main=="Snow"){
    img.src="climate-img/snow.png";
   }else if(weather.weather[0].main=="Clouds"){
    img.src="climate-img/cloudy.png";
   }else if(weather.weather[0].main=="Rain"){
    img.src="climate-img/raining.png";
   }else if(weather.weather[0].main=="Wind"){
    img.src="climate-img/wind.png";
   }else if(weather.weather[0].main=="Mist"){
    img.src="climate-img/images.png";
   }else if(weather.weather[0].main=="Clear"){
    img.src="climate-img/download.jpg";
   }else if(weather.weather[0].main=="Storm"){
    img.src="climate-img/storm.jpg";
   }
}
function dateManage(dateArg){
  let days = ["Sunday","Monday", "Tuesday"," Wednesday", "Thursday", "Friday","Saturday"];
  let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  return `${date} ${month} (${day}) ${year}`
}


