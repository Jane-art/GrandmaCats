var url = new URL(window.location.href);
var c = url.searchParams.get("id");
//console.log(c);

//console.log( window.location.href);


if (c!= null){
    let createUrl = document.getElementById("createUrl");
    let createName = document.getElementById("createName");
    let createDesc = document.getElementById("createDesc");
    let createAge = document.getElementById("createAge");
    let finder = document.getElementById("postAdding_img");
    
    createName.disabled=true;

    $.get("http://sb-cats.herokuapp.com/api/2/mysupercatsV2/show/"+c,function(data, status){

        createUrl.value=data.data.img_link;
        finder.src =data.data.img_link;
        createName.value=data.data.name;
        createDesc.value=data.data.description;
        createAge.value=data.data.age;
        //console.log(status); 
        //console.log(data);
    });
}



function editor(){
    let finder = document.getElementById("postAdding_img");
    let inputUrl = document.getElementById("createUrl");

    finder.src = inputUrl.value;
    
    console.log(inputUrl.value);
}

function cancelInput(){
    let createUrl = document.getElementById("createUrl");
    let createName = document.getElementById("createName");
    let createDesc = document.getElementById("createDesc");
    let createAge = document.getElementById("createAge");

    createUrl.value="";
    createName.value="";
    createDesc.value="";
    createAge.value="";
    window.open("http://127.0.0.1:5500/index.html","_self")
}

function sendInput(){
    //let finder = document.getElementById("postAdding_img");

    let createUrl = document.getElementById("createUrl");
    let createName = document.getElementById("createName");
    let createDesc = document.getElementById("createDesc");
    let createAge = document.getElementById("createAge");
    if (c!= null){
        let cat = {
            "id" :  c,
            "name" : createName.value,
            "rate":  Math.floor(Math.random() * 10) + 1 ,
            "age": createAge.value,
            "description": createDesc.value,
            "img_link": createUrl.value,
        }

        $.ajax({
            url: "http://sb-cats.herokuapp.com/api/2/mysupercatsV2/update/ "+c,
            type: 'PUT',
            data: cat,
            success: function(result) {
                // Do something with the result
                console.log(result);
                infoBlock.classList.remove("active");
                window.open("http://127.0.0.1:5500/index.html","_self")
            }
        });


        $.post("http://sb-cats.herokuapp.com/api/2/mysupercatsV2/add",cat,function(data, status){
            //console.log(status); 
            //console.log(data);
        });
    }else{
        let cat = {
            "id" :  Math.floor(Math.random() * 10000) + 1,
            "name" : createName.value,
            "rate":  Math.floor(Math.random() * 10) + 1 ,
            "age": createAge.value,
            "description": createDesc.value,
            "img_link": createUrl.value,
        }

        $.post("http://sb-cats.herokuapp.com/api/2/mysupercatsV2/add",cat,function(data, status){
            //console.log(status); 
            //console.log(data);
        });
    }
    cancelInput();
}
