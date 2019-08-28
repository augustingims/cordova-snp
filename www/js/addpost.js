var  database = window.openDatabase('snp', '0.1', 'snp', 65536);
var storage = window.localStorage;
var photo = document.getElementById("btn-photo");
var post = document.getElementById("btn-post");

var qtr = document.getElementById("txt-qtr");
var img = document.getElementById("img-post");

var listpost = document.getElementById("listpost");
var deconnexion = document.getElementById("deconnexion");

var imageCapture, latitude, longitude;

function verify(){
    var ok = false;

    var url = $('#img-post').attr('src');

    if(qtr!=null && qtr.value!=""){
      ok = true;
      $("#txt-qtr").removeClass("invalid").addClass("valid");
    }else{
      $("#txt-qtr").removeClass("valid").addClass("invalid");
      ok = false;
    } 
  
    if(img!=null && url!="img/200x150.png"){
      ok = true;
    }else{
      ok = false;
    } 

    return ok;
}

listpost.onclick = function() {
    window.location = "listpost.html";
}

deconnexion.onclick = function() {
    window.location = "index.html";
    storage.removeItem('connexion');
} 

photo.onclick = function(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

post.onclick = function(){
    if(verify()){
       insertValue();
    } else {
      window.alert("S'il vous plait entrer la zone et la photo de la zone.");
    }
}

function onSuccess(imageData) {
    getPosition();
    var image = document.getElementById('img-post');
    image.src = "data:image/jpeg;base64," + imageData;
    imageCapture = imageData;
}

function onFail(message) {
    $('#img-post').attr('src','img/200x150.png');
    window.alert('A échoué parce que: ' + message);
}

function executeQuery($query,callback){
    try{
        if(window.openDatabase){
            database.transaction(function(tx){
                tx.executeSql($query,[],function(tx,result){
                    if(typeof(callback) == "function"){
                            callback(result);
                    }else{
                            if(callback != undefined){
                                eval(callback+"(result)");
                            }
                    }
                },
                function(tx,error){
                    console.log(error);
                    console.log(tx);
                });
            });
        }
    }catch(e){
        console.log(e);
    }
}

function insertValue(){
    var sql = 'insert into post (image,longitude,latitude,quartier) VALUES ("'+imageCapture+'","'+longitude+'","'+latitude+'","'+qtr.value+'")';
    executeQuery(sql,function(results){
        window.alert("Votre post a été créé avec succès.");
        window.location = "listpost.html";
    });
}

function getPosition() { 
    var options = { enableHighAccuracy: true, maximumAge: 3600000 }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options); 

    function onSuccess(position) { 
        latitude =  position.coords.latitude;
        longitude =  position.coords.longitude;
    }; 

    function onError(error) { 
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n'); 
    } 
}