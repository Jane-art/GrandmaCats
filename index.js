const main = document.querySelector("main");
const infoBlock = document.querySelector(".info-block");


const setRate = function(n) {
    let fill = "<img src='img/cat-fill.svg' alt='^_^'>"
    let stroke = "<img src='img/cat-stroke.svg' alt='O_o'>"
    let rate = "", cnt = 10;
    for (let i = 0; i < cnt; i++) {
        rate += i < n ? fill : stroke;
    }
    return rate;
}

const getWord = function (n, w1, w2, w0) {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return w1;
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return w2;
        } else {
            return w0;
        }
    } else {
        return w0;
    }
}

const showInfo = function (data) {
       
    $.get("http://sb-cats.herokuapp.com/api/2/mysupercatsV2/show/"+data.id,function(data, status){

    infoBlock.classList.add("active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${data.data.img_link}" alt="${data.name}">
        <div class="information">
            <h2>${data.data.name}</h2>
            <h3>${data.data.age} ${getWord(data.data.age, "год", "года", "лет")}</h3>
            <p>${data.data.description}</p>
        </div>
        <div class="info-close" onclick="closeInfo()"></div>
        <div class="info-delete" onclick="deleteInfo(${data.data.id})"></div>
        <div class="info-redact" onclick="editInfo(${data.data.id})"></div>
    `;
    });

    
}

const closeInfo = function () {
    infoBlock.classList.remove("active");
}

const editInfo = function (data){
    window.open("http://127.0.0.1:5500/newCat.html?id="+data,"_self")
}

const deleteInfo = function (data) {
    console.log(data);

    $.ajax({
        url: "http://sb-cats.herokuapp.com/api/2/mysupercatsV2/delete/"+data,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
            console.log(result);
            infoBlock.classList.remove("active");
            window.open("http://127.0.0.1:5500/index.html","_self")
        }
    });
}

const getItem = function (data) {
    const item = `
        <div class="card">
            <div class="card-img" style="background-image: url(${data.img_link})"></div>
            <h3>${data.name}</h3>
            <p class="rate">${setRate(data.rate)}</p>
        </div>
    `
    main.innerHTML += item;
}

//Загружаем котов
let cats = []

$.get("http://sb-cats.herokuapp.com/api/2/mysupercatsV2/show",function(data, status){
    //alert("Data: " + data + "\nStatus: " + status);
    cats = data.data;
    //console.log(cats.data);
    cats.forEach(cat => {
        getItem(cat);
    });

    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function(e) {
            showInfo(cats[i]);
        })
    }
  });





/*
//создаём и заполняем карточки
console.log("создаём и заполняем карточки");
let catsContainer = document.getElementById("catsContainer");
for (let item of cats){

    let newCardImgElement =  document.createElement("div");
    newCardImgElement.className = "card-img";
    newCardImgElement.style.backgroundImage = "url("+ item.img_link +")"

    let newCardH3Element =  document.createElement("h3");
    newCardH3Element.innerText=item.name

    let newCardPElement =  document.createElement("p");
    newCardPElement.className = "rate";
    let rating = item.rate;
    
    for (let i = 0; i< 10; i++ ){
        if (i < rating){
            let newRatingElement =  document.createElement("img");
            newRatingElement.style.width = "20px";
            newRatingElement.src="img/cat-fill.svg";
            newRatingElement.alt="^_^";
            newCardPElement.appendChild(newRatingElement);
        }else{
            let newRatingElement =  document.createElement("img");
            newRatingElement.style.width = "20px";
            newRatingElement.src="img/cat-stroke.svg";
            newRatingElement.alt="O_o";
            newCardPElement.appendChild(newRatingElement);
        }
    }

    let newCardElement =  document.createElement("div");
    newCardElement.className = "card";

    newCardElement.appendChild(newCardImgElement);
    newCardElement.appendChild(newCardH3Element);
    newCardElement.appendChild(newCardPElement);

    catsContainer.appendChild(newCardElement);
    */