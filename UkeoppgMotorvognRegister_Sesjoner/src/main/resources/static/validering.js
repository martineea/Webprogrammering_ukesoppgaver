// Valdiering ligger i en egen JS-fil fordi vi skal bruke den på
// både registrere.html og endreKunde.html

function validerPersonnr() {
    const personnr = $("#personnr").val();
    const regexp = /^[0-9]{11}$/;
    const ok = regexp.test(personnr);

    if (!ok) {
        $("#personnrFeil").html("Personnummer må bestå av 11 siffer");
        return false;
    } else {
        $("#personnrFeil").html("");
        return true;
    }
}

function validerNavn() {
    const navn = $("#navn").val();
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,30}$/;
    const ok = regexp.test(navn);

    if(!ok) {
        $("#navnFeil").html("Navnet må bestå av 2 til 30 bokstaver");
        return false;
    } else {
        $("#navnFeil").html("");
        return true;
    }
}

function validerAdresse() {
    const adresse = $("#adresse").val();
    const regexp = /^[0-9a-zA-zæøåÆØÅ ,\-]{2,50}$/;
    const ok = regexp.test(adresse);

    if(!ok) {
        $("#adresseFeil").html("Adressen må bestå av 2 til 50 bokstaver og tall");
        return false
    } else {
        $("#adresseFeil").html("");
        return true;
    }
}

function validerKjennetegn() {
    const kjennetegn = $("#kjennetegn").val();
    const regexp = /^[A-Z][A-Z][0-9]{5}$/;
    const ok = regexp.test(kjennetegn);

    if(!ok) {
        $("#kjennetegnFeil").html("Kjennetegn må bestå av 2 store bokstaver og 5 tall");
        return false;
    } else {
        $("#kjennetegnFeil").html("");
        return true;
    }
}

function validerMerke() {
    const merke = $("#valgtBilMerke").val();

    if(merke === "Velg merke") {
        $("#merkeFeil").html("Velg et bilmerke");
        return false;
    } else {
        $("#merkeFeil").html("");
        return true;
    }
}

function validerPassord() {
    const passord = $("#passord").val();
    var regexp = /(?=.*[a-zA-ZæøåÆØÅ])(?=.*\d)[a-zA-ZæøåÆØÅ\d]{8,}/;
    var ok = regexp.test(passord);

    if(!ok) {
        $("#feilPassord").html("Passordet må være minimum 8 tegn, et av de en bokstav og et tall");
        return false;
    } else {
        $("#feilPassord").html("");
        return true;
    }
}

// Lagt in en <span> i html på modellFeil, denne skal vi ikke bruke

// Denne sjekker om ALLE feltene validerer
// Bruker && fordi vi vil at ALLE feltene skal være valide for å kunne utføre
function ingenValideringsFeil() {
    return (validerPersonnr() && validerNavn() && validerAdresse()
        && validerKjennetegn() && validerMerke() );
}
