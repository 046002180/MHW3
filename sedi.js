function show_menu() {
       let long_menu = document.querySelector("#long-menu");
       long_menu.style.display = "flex";
}

const small_menu = document.querySelector("#small-menu");
small_menu.addEventListener("click", show_menu);

function hide_menu() {
       let long_menu = document.querySelector("#long-menu");
       long_menu.style.display = "none";
}

const lm_button = document.querySelector("#lm-button");
lm_button.addEventListener("click", hide_menu);



//VARIABILE GLOBALE CHE PERMETTE DI GESTIRE IL CAMBIO DELLE IMMAGINI
let city_index = 0;

function change_view(index) {
       const map = document.querySelector("#map-img");
       const images = document.querySelectorAll(".external-img");
       const city_name = document.querySelector("#city-name");
       const description = document.querySelector("#description");
       city_name.innerHtml = '';
       description.innerHtml = '';
       switch (index % 4) {
              case 0:
                     //CAMBIA L'IMMAGINE DELLA MAPPA
                     map.src = "img/sedi/map-rome.jpg";
                     for (img of images) {
                            //CAMBIA L'IMMAGINE DELLA CITTÀ E DELLA SEDE
                            if (img.dataset.id === 'city-img')
                                   img.src = links.rome;
                            if (img.dataset.id === 'building-img')
                                   img.src = links.building_rome;
                     }
                     city_name.textContent = 'Roma';
                     description.textContent = headquarters_description.rome;
                     break;
              case 1:
                     map.src = "img/sedi/map-houston.jpg";
                     for (img of images) {
                            if (img.dataset.id === 'city-img')
                                   img.src = links.houston;
                            if (img.dataset.id === 'building-img')
                                   img.src = links.building_houston;
                     }
                     city_name.textContent = 'Houston';
                     description.textContent = headquarters_description.houston;
                     break;
              case 2:
                     map.src = "img/sedi/map-moscow.jpg";
                     for (img of images) {
                            if (img.dataset.id === 'city-img')
                                   img.src = links.moscow;
                            if (img.dataset.id === 'building-img')
                                   img.src = links.building_moscow;
                     }
                     city_name.textContent = 'Mosca';
                     description.textContent = headquarters_description.moscow;
                     break;
              case 3:
                     map.src = "img/sedi/map-prague.jpg";
                     for (img of images) {
                            if (img.dataset.id === 'city-img')
                                   img.src = links.prague;
                            if (img.dataset.id === 'building-img')
                                   img.src = links.building_prague;
                     }
                     city_name.textContent = 'Praga';
                     description.textContent = headquarters_description.prague;
                     break;
       }



}

function next_view() {
       city_index++;
       change_view(city_index);
}
const right_arrow = document.querySelector("#right-arrow");
right_arrow.addEventListener("click", next_view);

function previous_view() {
       city_index--;
       if (city_index < 0)
              city_index = 3;
       change_view(city_index);
}
const left_arrow = document.querySelector("#left-arrow");
left_arrow.addEventListener("click", previous_view);





//DATI PER EFFETTUARE LA RICHIESTA DEL TOKEN
const client_id = "b4b445045dd1a83";
const client_secret = "5a4b33faaabf84874a5ece253d451f15f0b3069d";
const endpointImage = "https://api.imgur.com/3/account/me/images";
const endpointToken = "https://api.imgur.com/oauth2/token";
const refresh_token = "bea7c3d1c1f10304a7b8ec8484129c537052ff36";
const links = [];
let token;
//eliminare e modificare fetch


function onResponse(response) {
       console.log(response);
       return response.json();
}
function onError(error) {
       console.log("Errore" + error);
}

function getToken(item) {
       console.log(item);
       token = item.access_token;
       //FUNZIONE CHE EFFETTUA LA QUERY SU IMGUR
       searchPhoto();
}
function getImages(json) {
       //ESTRAE I DATI UTILI DAL JSON
       const images = json.data;
       for (img of images)
              //PER OGNI IMMAGINE NELLA MAPPA LINKS VENGONO CARICATI I LINK SOURCE DELLE IMMAGINI
              links[img.name] = img.link;
       const img_container = document.querySelector('#city-image-box');
       //VISUALIZZA LA PRIMA COPPIA DI IMMAGINI
       let new_img = document.createElement('img');
       new_img.dataset.id = "city-img";
       new_img.classList.add("external-img");
       new_img.src = links['rome'];
       img_container.appendChild(new_img);
       const bottom_box = document.querySelector('#bottom-box');
       new_img = document.createElement('img');
       new_img.dataset.id = "building-img";
       new_img.classList.add("external-img");
       new_img.src = links['building_rome'];
       bottom_box.appendChild(new_img);

}
function searchPhoto(name) {
       fetch(endpointImage,
              {
                     headers: {
                            'Authorization': ' Bearer ' + token
                     }
              }).then(onResponse, onError).then(getImages);
}




fetch(endpointToken,
{
              method:'POST',
              body: 'grant_type=refresh_token'+'&client_id='+client_id+'&client_secret='+client_secret+'&refresh_token='+refresh_token,
              headers:
       {
              'Content-Type': 'application/x-www-form-urlencoded'
       }
}
).then(onResponse,onError).then(getToken);

