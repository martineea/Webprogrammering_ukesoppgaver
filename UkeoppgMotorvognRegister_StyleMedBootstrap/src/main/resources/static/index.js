function registrer() {

    // lager et objekt
    const register = {
        personnummer: $("#personnummer").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        bilmerke: $("#bilmerke").val(),
        biltype: $("#biltype").val(),
    };

    $.post("/registrer", register, function () {
        hentAlle();
    });
    // tømmer input-feltene
    $("#personnummer").val("");
    $("#navn").val("");
    $("#adresse").val("");
    $("#kjennetegn").val("");
    $("#bilmerke").val("");
    $("#biltype").val("");
}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        skrivUt(data);
    });
}

function skrivUt(registere) {
    let ut =
        "<table class='table table-striped'>" +
        "<td><strong>Personnr</strong></td>" +
        "<td><strong>Navn</strong></td>" +
        "<td><strong>Adresse</strong></td>" +
        "<td><strong>Kjennetegn</strong></td>" +
        "<td><strong>Merke</strong></td>" +
        "<td><strong>Type</strong></td>" ;

    for (const register of registere) {
        ut +=
            "<tr>" +
            "<td>" + register.personnummer + "</td>" +
            "<td>" + register.navn + "</td>" +
            "<td>" + register.adresse + "</td>" +
            "<td>" + register.kjennetegn + "</td>" +
            "<td>" + register.bilmerke + "</td>" +
            "<td>" + register.biltype + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#alleRegistreringer").html(ut);
}

function slettAlle() {
    $.get("/slettAlle", function() {
        hentAlle();
    });
}

