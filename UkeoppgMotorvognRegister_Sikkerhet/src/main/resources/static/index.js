function loggInn() {
    if(loggInnValideringOK()){
        const url = "/loggInn?brukernavn="+$("#brukernavn").val()+"&passord="+$("#passord").val();
        $.get( url, function( OK ) {
            if(OK){
                window.location.href="liste.html";
            }
            else{
                $("#feil").html("Feil i brukernavn eller passord");
            }
        })
            .fail(function(jqXHR) {
                const json = $.parseJSON(jqXHR.responseText);
                $("#feil").html(json.message);
            });
    }
}

function krypterAllePassord() {
    $.get( "/krypterAllePassord", function( OK ) {
        if(OK){
            $("#feil").html("Kryptering utført!");
        }
        else{
            $("#feil").html("Feil i kryptering!");
        }
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}