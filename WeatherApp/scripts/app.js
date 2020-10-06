const cityForm= document.querySelector('form');

const card =document.querySelector('.card');

const details=document.querySelector('.details');

const time=document.querySelector('img.time');

const icon=document.querySelector('.icon img');

const body=document.querySelector('body')



//trying hover effect after images have loaded
//const images=document.querySelectorAll('img')




const updateUI =(data)=>{

/*
    cityDets=data.cityDets;
    weather=data.weather;
*/
    //destructuring

    const {cityDets,weather} = data;

    //updateHTML
    details.innerHTML= `<h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;
  //icons update
  let timeSrc=null;
  let BackgroundColor1="background: #696969", BackgroundColor2="background: #eeedec";
  
    if(weather.IsDayTime){
    timeSrc='img/day.svg';
    body.setAttribute('style',BackgroundColor2)
    }
    else{
    timeSrc='img/night.svg';
    body.setAttribute('style',BackgroundColor1);
    }
    time.setAttribute('src',timeSrc);
  
    const iconSrc=`img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc)



    if (card.classList.contains('d-none')){

        card.classList.remove('d-none');

    }



};

const updateCity = async(city) =>{
    const cityDets = await getCity(city);
    const weather= await getWeather(cityDets.Key);

    return { cityDets,weather }
}




cityForm.addEventListener('submit',e=>{

e.preventDefault()
//get city value
const city =cityForm.city.value.trim();
cityForm.reset()

//update UI
updateCity(city)
.then(data=>updateUI(data))
.catch(err=>console.log(err));

})



