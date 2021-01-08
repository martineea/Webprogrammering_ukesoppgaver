$(function () { // kjøres når dokumentet er ferdig lastet
    hentBiler();
});

/*
// Klient-validering for umiddelbar respons til bruker
function validerOgLagreKunde() {
    const personnrOK = validerPersonnr($("#personnr").val());
    const navnOK = validerAdresse($("#adresse").val());
    const adresseOK = validerAdresse($("#adresse").val());
    const kjennetegnOK = validerKjennetegn($("#kjennetegn").val());
    if (personnrOK && navnOK && adresseOK && kjennetegnOK) {
        registrer();
    }
}*/

function hentBiler() {
    $.get("/hentBiler", function (biler) {
        formaterBilMerke(biler);
    })
        .fail (function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

// Velger bilmerke
function formaterBilMerke(biler) {
    let ut = "<select onchange='finnBilModeller()' id='valgtBilMerke'>";
    let i = 0;
    let forrigeMerke = "";
    ut += "<option id='ikkeValgtMerke'>Velg merke</option>";
    for (const bil of biler) {
        if (bil.merke != forrigeMerke) {
            ut += "<option>" + bil.merke + "</option>";
        }
        forrigeMerke = bil.merke;
    }
    ut += "</select>";
    $("#bilmerkene").html(ut);
}

// Finner modell for valgt bilmerke
function finnBilModeller() {
    const valgtBilMerke = $("#valgtBilMerke").val();
    $("#merkeFeil").html("");
    $.get("/hentBiler", function (biler) {
        formaterBilModell(biler, valgtBilMerke);
    })
        .fail (function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function formaterBilModell(biler, valgtBilMerke) {
    let utModell = "<select id='valgtBilModell'>";
    for (const bil of biler) {
        if (bil.merke === valgtBilMerke) {
            utModell += "<option>" + bil.modell + "</option>";
        }
    }
    utModell += "</select>";
    $("#bilmodellene").html(utModell);
}

function validerOgRegistrerKunde() {
    const register = {
        personnr: $("#personnr").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        merke: $("#valgtBilMerke").val(),
        modell: $("#valgtBilModell").val()
    };
    // Skal kun sende inn registreringen hvis det ikke er noen valideringsfeil
    if (ingenValideringsFeil()) {
        $.post("/registrer", register, function () {
            hentAlle();
        });

        window.location.href = "/";
    }
}

/*
// lager en kunde (kunde-objekt)
function registrerKunde() {
    const register = {
        personnr: $("#personnr").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        merke: $("#valgtBilMerke").val(),
        modell: $("#valgtBilModell").val()
    };
    const url = "/registrer";
    $.post(url, register, function () {
        window.location.href = 'index.html';
    });


    // VALIDERING AV INPUT:
    let feilmelding = false;

    // Personnummer
    if (isNaN(register.personnr) || register.personnr === null) {
        $("#personnrFeil").html("Må skrive inn et personnummer bestående av siffer");
        feilmelding = true;
    } else if (register.personnr === "") {
        $("#personnrFeil").html("Må skrive inn et personnummer");
        feilmelding = true;
    } else if (register.personnr.length < 2) {
        $("#personnrFeil").html("Personnummer for kort");
        feilmelding = true;
    } else {
        $("#personnrFeil").html(null);
    }

    // NAVN
    if (!isNaN(register.navn) || register.navn === "") {
        $("#navnFeil").html("Må skrive inn navn (kan ikke være tall)");
        feilmelding = true;
    } else if (register.navn.length < 4) {
        $("#navnFeil").html("Navnet er for kort");
        feilmelding = true;
    } else {
        $("#navnFeil").html("");
    }

    // ADRESSE
    if (!isNaN(register.adresse) || register.adresse === "") {
        $("#adresseFeil").html("Må skrive inn adresse");
        feilmelding = true;
    } else if (register.adresse.length < 2) {
        $("#adresseFeil").html("Adressen er for kort");
        feilmelding = true;
    } else {
        $("#adresseFeil").html("");
    }

    // KJENNETEGN
    if (!isNaN(register.kjennetegn) || register.kjennetegn === "") {
        $("#kjennetegnFeil").html("Må skrive inn kjennetegn");
        feilmelding = true;
    } else if (register.adresse.kjennetegn < 2) {
        $("#kjennetegnFeil").html("Kjennetegn for kort");
        feilmelding = true;
    } else {
        $("#kjennetegnFeil").html("");
    }

    // MERKE
    if (register.merke === "Velg merke") {
        $("#merkeFeil").html("Må velge et bilmerke");
        feilmelding = true;
    } else {
        $("#merkeFeil").html("");
    }


    // MODELL kommer ikke opp med mindre merke er valgt
    if (register.modell === "Velg modell")  {
        $("#merkeFeil").html("Må velge et bilmerke");
        feilmelding = true;
    } else {
        $("#merkeFeil").html("");
    }


    if (feilmelding === false) {
        $("#personnr").val("");
        $("#navn").val("");
        $("#adresse").val("");
        $("#kjennetegn").val("");
        $("#valgtBilMerke").val("");
        $("#valgtBilModell").val("");
    } else {
        return;
    }

    // Hvis feltene er tomme vil den ikke skrive ut kunden, hvis det er fylt inn riktig skriver den ut en registrering:
    if (register.personnr === "" && register.navn === "" && register.adresse === "" && register.kjennetegn === ""
        && register.merke === $("#ikkeValgtMerke")) {
        return;
    } else {
        $.post("/hentAlle", register, function () {
            hentAlle();
        });
    }
};

*/