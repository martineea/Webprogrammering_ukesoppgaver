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

// Denne sjekker om ALLE feltene validerer
// Bruker && fordi vi vil at ALLE feltene skal være valide for å kunne utføre
function ingenValideringsFeil() {
    return (validerPersonnr() && validerNavn() && validerAdresse()
        && validerKjennetegn() && validerMerke() );
}


function validerBrukernavn(){
    const brukernavn = $("#brukernavn").val();
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(brukernavn);
    if(!ok){
        $("#feilBrukernavn").html("Navnet må bestå av 2 til 20 bokstaver");
        return false;
    }
    else{
        $("#feilBrukernavn").html("");
        return true;
    }
}

function validerPassord(){
    const passord = $("#passord").val();
    const regexp = /^(?=.*[A-ZÆØÅa-zøæå])(?=.*\d)[A-ZØÆÅa-zøæå\d]{8,}$/;
    const ok = regexp.test(passord);
    if(!ok){
        $("#feilPassord").html("Passordet må være minimum 8 tegn, minst en bokstav og et tall");
        return false;
    }
    else{
        $("#feilPassord").html("");
        return true;}
}

function loggInnValideringOK() {
    return (validerBrukernavn && validerPassord());
}

// Lagt in en <span> i html på modellFeil, denne skal vi ikke bruke

