// Bare prøvd å gå igjennom det han viste på videoen av dette løsningsforslaget
// for nedtrekkslister basert på koden jeg har skrevet selv

$(function(){  // kjøres når dokumentet er ferdig lastet, kjøres når nettsiden lastes inn
    hentAlleBiler();
});

function hentAlleBiler() {
    $.get("/hentBiler", function(biler) {
        formaterBiler(biler);
    });
}

// funksjonalitet for å bygge opp drop-downmenyen for bilmerker
function formaterBiler(biler) {
    let ut = "<select id='valgtMerke' onchange='finnTyper()'>" // når man velger et bilmerke - så skal man kalle en js-funksjon (finnTyper) som bygger opp en biltypeliste for dette bilmerket man har valgt
    let forrigeMerke = ""; // trenger et sted å lage forrige merke når man går igjennom listne med biler, lager så en tom streng
    ut += "<option>Velg merke</option>"; // første valget i drop-down-menyen - som forteller deg hva du skal gjøre

    // tester at ikke samme bilmerke blir vist flere ganger i nedtrekksmenyen
    for (const bil of biler) { // for å unngå at samme bilmerke kommer opp flere ganger (siden vi har lagt inn flere)
        if(bil.merke != forrigeMerke) { // så sammenligner vi den med forrige (som foreløpig er tom)
            ut += "<option>"+bil.merke+"</option>"; // hvis ikke så legger vi til merkene
        }
        forrigeMerke = bil.merke; // i neste gjennomløp er forrigeMerke lik bil.merke
    }
    ut+= "</select>"
    $("#merke").html(ut);
}

// bygge opp drop-down-menyen for biltyper/ bilmodeller
function finnTyper() {
    const valgtMerke = $("#valgtMerke").val(); // må vite hvilke bilmerker som er valgt
    $.get("hentBiler", function(biler) {
        formaterTyper(biler, valgtMerke); // for å gjøre det ryddigere sender vi dette videre til en ny funksjon kalt formaterTyper
    });
}

function formaterTyper(biler, valgtMerke) { //tar inn biler og valgtMerke som arugmenter
    let ut = "<select id='valgtType>"; // igjen bygge en drop-down-meny
    for (const bil of biler) {
        if (bil.merke === valgtMerke) { // hvis bilmerket er lik det valgte merket
            ut += "<option>"+bil.type+"</option>"; // da skal vi legge til typer i drop-down-menyen
        }
    }
    ut += "</select>";
    $("#type").html(ut);
}

function regMotorvogn() {

    // lager et objekt
    const motorvogn = {
        personnummer: $("#personnummer").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        merke: $("#valgtMerke").val(),
        type: $("#valgtType").val(),
    };

    $.post("/registrer", motorvogn, function () {
        hentAlle();
    });
    // tømmer input-feltene
    $("#personnummer").val("");
    $("#navn").val("");
    $("#adresse").val("");
    $("#kjennetegn").val("");
    $("#valgtMerke").val("");
    $("#valgtType").val("");
}

function hentAlle() {
    $.get("/hentAlle", function (biler) {
        skrivUt(biler);
    });
}

function skrivUt(biler) {
    let ut =
        "<table class='table table-striped'>" +
        "<td><strong>Personnr</strong></td>" +
        "<td><strong>Navn</strong></td>" +
        "<td><strong>Adresse</strong></td>" +
        "<td><strong>Kjennetegn</strong></td>" +
        "<td><strong>Merke</strong></td>" +
        "<td><strong>Type</strong></td>" ;

    for (const bil of biler) {
        ut +=
            "<tr>" +
            "<td>" + bil.personnr + "</td>" +
            "<td>" + bil.navn + "</td>" +
            "<td>" + bil.adresse + "</td>" +
            "<td>" + bil.kjennetegn + "</td>" +
            "<td>" + bil.merke + "</td>" +
            "<td>" + bil.type + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#alleRegistreringer").html(ut);
}

function slettAlle() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}

