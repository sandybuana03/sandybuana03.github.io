let chart, map, marker;
let cities=[];

/* ================= LOAD KOTA ================= */
async function loadCities(){
  const prov=await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json").then(r=>r.json());
  for(const p of prov){
    const kota=await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${p.id}.json`).then(r=>r.json());
    kota.forEach(k=>cities.push(k.name));
  }
}
loadCities();

/* ================= AUTOCOMPLETE ================= */
$("#search").on("input",function(){
  const v=this.value.toLowerCase();
  $("#suggest").empty();
  if(!v) return;
  cities.filter(c=>c.toLowerCase().includes(v)).slice(0,10)
    .forEach(c=>$("#suggest").append(`<div onclick="pick('${c}')">${c}</div>`));
});
function pick(c){ $("#search").val(c); $("#suggest").empty(); }

/* ================= GEOCODING (AMAN INDONESIA) ================= */
async function geoCity(city){
  const url=`https://nominatim.openstreetmap.org/search?format=json&q=${city},Indonesia`;
  const res=await fetch(url,{headers:{'User-Agent':'weather-app'}});
  const data=await res.json();

  // fallback KHUSUS TEGAL
  if(data.length===0 && city.toLowerCase().includes("tegal")){
    return {lat:-6.8694, lon:109.1402, name:"Kota Tegal"};
  }

  if(!data.length) return null;
  return {lat:data[0].lat, lon:data[0].lon, name:data[0].display_name};
}

/* ================= WEATHER ================= */
async function getWeather(city){
  const geo=await geoCity(city);
  if(!geo) return alert("Kota tidak ditemukan di Indonesia");

  const api=`https://api.open-meteo.com/v1/forecast?
latitude=${geo.lat}&longitude=${geo.lon}
&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode
&current_weather=true
&timezone=Asia/Jakarta`;

  const data=await fetch(api).then(r=>r.json());

  const temp=data.current_weather.temperature;
  const wind=data.current_weather.windspeed;
  const rain=data.daily.precipitation_sum[0];

  $("#city").text(geo.name);
  $("#temp").text(temp+" °C");
  $("#desc").html(`
    🌧️ Hujan: ${rain} mm<br>
    💨 Angin: ${wind} km/jam
  `);

  // ICON DINAMIS
  let icon="☀️";
  if(rain>5) icon="🌧️";
  else if(wind>20) icon="💨";
  else if(temp<26) icon="⛅";

  $("#icon").attr("src",
    rain>5
    ? "https://cdn-icons-png.flaticon.com/512/3076/3076129.png"
    : "https://cdn-icons-png.flaticon.com/512/869/869869.png"
  );

  $("#weather").fadeIn();

  // MAP
  if(!map){
    map=L.map("map").setView([geo.lat,geo.lon],10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  }
  if(marker) marker.remove();
  marker=L.marker([geo.lat,geo.lon]).addTo(map);
  map.setView([geo.lat,geo.lon],10);

  // CHART
  if(chart) chart.destroy();
  chart=new Chart($("#chart"),{
    type:"line",
    data:{
      labels:data.daily.time,
      datasets:[
        {
          label:"Suhu Max (°C)",
          data:data.daily.temperature_2m_max,
          borderWidth:3,
          tension:.4
        },
        {
          label:"Hujan (mm)",
          data:data.daily.precipitation_sum,
          borderDash:[5,5],
          tension:.4
        }
      ]
    }
  });
}

/* ================= EVENTS ================= */
$("#searchBtn").click(()=>getWeather($("#search").val()));

// $("#saveFav").click(()=>{
//   const city=$("#search").val();
//   if(!city) return;
//   let fav=JSON.parse(localStorage.getItem("fav")||"[]");
//   if(!fav.includes(city)) fav.push(city);
//   localStorage.setItem("fav",JSON.stringify(fav));
//   loadFav();
// });

// function loadFav(){
//   const fav=JSON.parse(localStorage.getItem("fav")||"[]");
//   $("#favList").html(fav.map(f=>`<li onclick="getWeather('${f}')">${f}</li>`));
// }
// loadFav();

/* ================= DARK MODE ================= */
$("#darkMode").click(()=>$("body").toggleClass("dark"));

/* ================= AUTO TEGAL ================= */
getWeather("Kota Tegal");