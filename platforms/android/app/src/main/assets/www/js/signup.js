    var  database = window.openDatabase('snp', '0.1', 'snp', 65536);
    
    var nom = document.getElementById("txt-last-name"); 
    var prenom = document.getElementById("txt-first-name");
    var email = document.getElementById("txt-email"); 
    var pass = document.getElementById("txt-password");
    var confirmPass = document.getElementById("txt-password-confirm"); 
    
    var sauvegarde = document.getElementById("btn-submit");

    var login = document.getElementById("btn-login");

    sauvegarde.onclick = function() {
        if(verify()){
            insertValue();
        } else {
          window.alert("S'il vous plait entrer vos informations.");
        }
        
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
  login.onclick = function() {
      window.location = "login.html";
  }
    function insertValue(){
        var sql = 'insert into compte (nom,prenom,email,password) VALUES ("'+nom.value+'","'+prenom.value+'","'+email.value+'","'+pass.value+'")';
        executeQuery(sql,function(results){
            window.alert("Votre compte a été créé avec succès.");
            window.location = "login.html";
        });
    }

    function verify(){
        var ok = false;
        if(nom!=null && nom.value!=""){
          ok = true;
          $("#txt-last-name").removeClass("invalid").addClass("valid");
        }else{
          $("#txt-last-name").removeClass("valid").addClass("invalid");
          ok = false;
        } 
      
        if(prenom!=null && prenom.value!=""){
          ok = true;
          $("#txt-first-name").removeClass("invalid").addClass("valid");
        }else{
          $("#txt-first-name").removeClass("valid").addClass("invalid");
          ok = false;
        } 

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

        if(confirmPass!=null && confirmPass.value!=""){
            if(pass!=null && confirmPass.value==pass.value){
                ok = true;
                $("#txt-password-confirm").removeClass("invalid").addClass("valid");
            }else{
                $("#txt-password-confirm").removeClass("valid").addClass("invalid");
                ok = false;
            }
        }else{
            $("#txt-password-confirm").removeClass("valid").addClass("invalid");
            ok = false;
        } 
        return ok;
    }
