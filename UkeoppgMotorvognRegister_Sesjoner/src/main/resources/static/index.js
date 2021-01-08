function loggInn() {
    const url = "/loggInn?brukernavn="+$("#brukernavn").val()+
        "&passord="+$("#passord").val();
    $.get(url, function(OK) {
        if(OK) {
            window.location.href = "liste.html";
        } else {
            $("#feil").html("Feil brukernavn eller passord");
        }
    })
    // hvis det blir feil på andre ting, feks feil på server
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}