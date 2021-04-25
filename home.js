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


const key = 'c7d8115b-cd40-493e-96a8-bf196eefb21d';
const news_endpoint = 'https://content.guardianapis.com/search?q=';

function onResponse(response) {
    return response.json();
}
function onError(error) {
    console.log("Errore" + error);
}
function onJson(json) {
    const result = json.response;
    console.log(result);
    if (result.status !== 'ok') {
        console.log("errore");
        return;
    }
    const news = result.results;
    const news_box = document.querySelector('#news-box');
    news_box.innerHTML='';
    for (item of news) {
        let text = item.webTitle;
        let url = item.webUrl;
        let a = document.createElement("a");
        a.classList.add("external-news");
        a.textContent = text;
        a.href=url;
        news_box.appendChild(a);

    }
}
function search_news() {
    //NON UTILIZZO IL METODO CON EVENT CURRENT TARGET PERCHè ALLA PRIMA APERTURA LA FUNZIONE VIENE INVOCATO SENZA ALCUN EVENTO SCATENANTE
    const options=document.querySelector("#selection");
    let keyword=options.value;
    const news_header=document.querySelector("#news-header h2");
    news_header.textContent='News on '+keyword;
    keyword=keyword.toLowerCase();
    keyword=keyword.replace("-","%20");
    const query = news_endpoint + keyword + '&api-key=' + key;
    fetch(query).then(onResponse, onError).then(onJson);
}
const selection=document.querySelector("#selection");
selection.addEventListener("change",search_news);
search_news();
