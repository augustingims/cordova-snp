var  database = window.openDatabase('snp', '0.1', 'snp', 65536);
var storage = window.localStorage;

var listpost = document.getElementById("listepost");
var deletepost = document.getElementById("deletepost");
var deconnexion = document.getElementById("deconnexion");

var map, marker;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        screen.orientation.lock('portrait');
        screen.orientation.unlock();
        selectValue();
    }

};

app.initialize();

listpost.onclick = function() {
    window.location = "listpost.html";
}
deconnexion.onclick = function() {
    window.location = "index.html";
    storage.removeItem('connexion');
}
deletepost.onclick = function() {
    deleteValue();
}

window.history.forward();

function initMap(latd,lon) {
    var geo = {lat: latd, lng: lon};
    map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: geo});
    marker = new google.maps.Marker({position: geo, map: map});
}

function selectValue(){
    var query = 'SELECT * FROM post where id = '+parseInt(storage.getItem('deletePost'));
    database.transaction(function(tx){
        tx.executeSql(query, [], function(tx, result)
        {
            if(result.rows.length > 0){
                lon = result.rows[0].longitude;
                lat = result.rows[0].latitude;
                initMap(Number(lat),Number(lon));
                $("#listpost").css("display", "block");
                $('#listpost li').remove();
                var list_post = $('#listpost');
                list_post.append('<li class="ui-li-static ui-body-inherit ui-li-has-thumb ui-last-child" ><img class="imgpost" src="data:image/jpeg;base64,'+result.rows[0].image+'" alt="img" class="ui-li-icon"> <h3>'+result.rows[0].quartier+'</h3> <p>Latitude : <em>'+result.rows[0].latitude+'</em></p> <p>Longitude : <em>'+result.rows[0].longitude+'</em></p></li>');
            }else{
                window.alert("Pas d'information de localisation.");
            }
        },
        function(tx,error){
            console.log(error);
            console.log(tx);
        });
    });
}

function deleteValue(){
    var query = 'DELETE FROM post where id = '+parseInt(storage.getItem('deletePost'));
    database.transaction(function(tx){
        tx.executeSql(query, [], function(tx, result)
        {
        window.alert("Opération effectuée avec succès.");
        window.location = "listpost.html";
        },
        function(tx,error){
            console.log(error);
            console.log(tx);
        });
    });
}