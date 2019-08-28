var  database = window.openDatabase('snp', '0.1', 'snp', 65536);
var storage = window.localStorage;
var addpost = document.getElementById("addpost");
var deconnexion = document.getElementById("deconnexion");

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

addpost.onclick = function() {
    window.location = "addpost.html";
}
deconnexion.onclick = function() {
    window.location = "index.html";
    storage.removeItem('connexion');
}
function selectValue(){
    var query = 'SELECT * FROM post';
    database.transaction(function(tx){
        tx.executeSql(query, [], function(tx, result)
        {
            if(result.rows.length > 0){
                $("#listpost").css("display", "block");
                $("#not-data").css("display", "none");
                showlist(result.rows);
            }else{
                $("#listpost").css("display", "none");
                $("#not-data").css("display", "block");
            }
        },
        function(tx,error){
            console.log(error);
            console.log(tx);
        });
    });
}

window.history.forward();

function detail(id){
    storage.setItem('deletePost', id);
    window.location = "detailpost.html";
}

function showlist(posts){
    $('#listpost li').remove();
    var list_post = $('#listpost');
    list_post.append('<li class="ui-li-divider ui-bar-a ui-first-child" >Liste des postes </li>');
    $.each(posts, function(index,post) {
        list_post.append('<li onclick="detail('+post.id+')" class="ui-li-static ui-body-inherit ui-li-has-thumb ui-last-child" ><img class="imgpost" src="data:image/jpeg;base64,'+post.image+'" alt="img" class="ui-li-icon"> <h3>'+post.quartier+'</h3> <p>Latitude : <em>'+post.latitude+'</em></p> <p>Longitude : <em>'+post.longitude+'</em></p></li>');
    });
}