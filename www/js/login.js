
var  database = window.openDatabase('snp', '0.1', 'snp', 65536);
var storage = window.localStorage;

var email = document.getElementById("txt-email"); 
var pass = document.getElementById("txt-password");

var connexion = document.getElementById("btn-connexion");
var signup = document.getElementById("btn-signup");

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        window.history.forward();
    }

};
  
app.initialize();

window.history.forward();

function checkValue(){
    var query = "SELECT * FROM compte where email = '"+email.value+"' and password = '"+pass.value+"'";
    try{
        database.transaction(function(tx){
            tx.executeSql(query, [], function(tx, result)
            {
                if(result.rows.length > 0){
                    storage.setItem('connexion', 'ok');
                    window.location = "listpost.html";
                }else{
                    window.alert("vous n'avez pas entré les références correctes.");
                }
            },
            function(tx,error){
                console.log(error);
                console.log(tx);
            });
        });
    }catch(e){
        console.log(e);
    }
}

function verify(){
    var ok = false;
    if(email!=null && email.value!=""){
      ok = true;
      $("#txt-email").removeClass("invalid").addClass("valid");
    }else{
      $("#txt-email").removeClass("valid").addClass("invalid");
      ok = false;
    } 
  
    if(pass!=null && pass.value!=""){
      ok = true;
      $("#txt-password").removeClass("invalid").addClass("valid");
    }else{
      $("#txt-password").removeClass("valid").addClass("invalid");
      ok = false;
    } 

    return ok;
}

signup.onclick = function() {
 window.location= "signup.html"
}

connexion.onclick = function() {
    if(verify()){
        checkValue();
    } else {
      window.alert("S'il vous plaît entrer vos informations de connexion.");
    }
}