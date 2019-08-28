var storage = window.localStorage;
var database = null;

var login = document.getElementById("btn-login");
var signup = document.getElementById("btn-signup");

var app = {
     // Application Constructor
     initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        initDatabase();
    },
    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        screen.orientation.lock('portrait');
        screen.orientation.unlock();
        window.history.forward();

        if(storage.getItem('splashscreen') == null){
            storage.setItem('splashscreen', 'SNP');
            navigator.splashscreen.show();
            window.setTimeout(function () {
                navigator.splashscreen.hide();
            }, 3000);
        }
        if(storage.getItem('connexion') != null){
            window.location = "listpost.html";
        }
    }

};

app.initialize();

login.onclick = function() {
    window.location = "login.html";
}

signup.onclick = function() {
    window.location = "signup.html";
}


function initDatabase() {
    try{
        if(window.openDatabase){
            database = window.openDatabase('snp', '0.1', 'snp', 65536);
            database.transaction(function(transaction) {
              transaction.executeSql('CREATE TABLE compte (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, prenom TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)');
              transaction.executeSql('CREATE TABLE post (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, image blob NOT NULL, longitude TEXT NOT NULL, latitude TEXT NOT NULL, quartier TEXT NOT NULL)');
            });
        }
    }catch(e){
        console.log(e);
    }
    
}