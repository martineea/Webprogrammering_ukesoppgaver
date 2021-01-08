//Oppgave 1 : Tekstbokser

function skrivUt() {
    let navn = document.getElementById("navn").value;
    let alder = document.getElementById("alder").value;
    let alderTall = Number(alder);

    let ut = navn + ", " + alderTall + " år";

    if (navn === "") {
        document.getElementById("utskrift").innerHTML = "Må skrive inn navn!";
    } else if (isNaN(alderTall) || alderTall <= 0) {
        document.getElementById("utskrift").innerHTML = "Alder for lav!";
    } else {
        document.getElementById("utskrift").innerText = ut;

    }
}


// Oppgave 2 : Konverterer

function konverter(degree) {
    let temperatur;
    if (degree === 'C') {
        temperatur = document.getElementById("innCelsius").value * (9 / 5) + 32;
        document.getElementById("innFahrenheit").value = Math.round(temperatur);
    } else {
        temperatur = (document.getElementById("innFahrenheit").value - 32) * 5 / 9;
        document.getElementById("innCelsius").value = Math.round(temperatur);
    }
}

// Oppgave 3 : Kalkulator


function regnUt(tegn) {

    let innTall1 = document.getElementById("innTall1").value;
    let innTall2 = document.getElementById("innTall2").value;
    let tall1 = Number(innTall1);
    let tall2 = Number(innTall2);

    if (isNaN(tall1) || isNaN(tall2)) {
        document.getElementById("utregning").innerText = "Ikke skrevet inn et tall"
    }
    if (tegn === '+') {
        let tall3 = tall1 + tall2;
        document.getElementById("utregning").innerText = tall3;
    } else if (tegn === '-') {
        let tall3 = tall1 - tall2;
        document.getElementById("utregning").innerText = tall3;
    } else if (tegn === '*') {
        let tall3 = tall1 * tall2;
        document.getElementById("utregning").innerText = tall3;
    } else if (tegn === '/') {
        let tall3 = tall1 / tall2;
        document.getElementById("utregning").innerText = tall3;
    }
}


// Oppgave 4: Personregister

// Ny registrering:
let utRegistrering;
let nyRegistrering = [];

function registrer() {
    let registrer = {
        navn: document.getElementById("registrerNavn").value,
        adresse: document.getElementById("registrerAdresse").value,
        telefonnr: document.getElementById("registrerTelefonnr").value,
    };

    //let telefonnr = document.getElementById("registrerTelefonnr").value;
    //let tlf = Number (telefonnr);
    let feilmelding = false;

    if (registrer.navn === "") {
        document.getElementById("feilNavn").innerHTML = "Må skrive inn et navn";
        feilmelding = true;
    } else {
        document.getElementById("feilNavn").innerHTML = "";
    }

    if (registrer.adresse === "") {
        document.getElementById("feilAdresse").innerHTML = "Må skrive inn en adresse";
        feilmelding = true;
    } else {
        document.getElementById("feilAdresse").innerHTML = "";
    }

    if (isNaN(registrer.telefonnr) || registrer.telefonnr === "" || registrer.telefonnr.length != 8) {
        document.getElementById("feilTelefonnr").innerHTML = "Må skrive inn et telefonnr";
        feilmelding = true;
    } else {
        document.getElementById("feilTelefonnr").innerHTML = "";
    }

    if (feilmelding === false) {
        document.getElementById("reset").reset();
    } else {
        return;
    }

    if (nyRegistrering.navn === "" && nyRegistrering.adr === "" && nyRegistrering.telefonnr === "") {
        return;
    } else {
        nyRegistrering.push(registrer);
    }

    utRegistrering =
        "<table><tr>" +
        "<th>Navn</th>" +
        "<th>Adresse</th>" +
        "<th>Telefonnr</th>" +
        "</tr>";

    for (let r of nyRegistrering) {
        utRegistrering += "<tr>" +
            "<td>" + r.navn + "</td>" +
            "<td>" + r.adresse + "</td>" +
            "<td>" + r.telefonnr + "</td>" +
            "</tr>";
    }
    document.getElementById("personRegister").innerHTML = utRegistrering;
    utRegistrering += "</table>";
}


// Ferdig register:

function visPersonRegister() {
    const personRegister = [];

    const person1 = {
        navn: "Line Jensen",
        adresse: "Osloveien 2",
        telefonnr: "12345678"
    };

    const person2 = {
        navn: "Ole Olsen",
        adresse: "Askerveien 82",
        telefonnr: "98765432"
    };

    const person3 = {
        navn: "Ali Zedan",
        adresse: "Storgata 8",
        telefonnr: "33445566"
    };

    // Ekstraoppgave 1: flere personer

    const person4 = {
        navn: "Jens Jensen",
        adresse: "Vevelsveien 82",
        telefonnr: "44556677"
    };

    const person5 = {
        navn: "Martin Hallo",
        adresse: "Frogner 8",
        telefonnr: "11223344"
    };

    personRegister.push(person1);
    personRegister.push(person2);
    personRegister.push(person3);

    personRegister.push(person4);
    personRegister.push(person5);


    let ut = "<br />Usortert <br />";
    ut += "<table> <tr>" +
        "<th>Navn</th><th>Adresse</th><th>Telefonnr</th>" +
        "</tr>";

    for (let p of personRegister) {
        ut += "<tr>";
        ut +=
            "<td>" +
            p.navn +
            "</td><td>" +
            p.adresse +
            "</td><td>" +
            p.telefonnr +
            "</td>";
        ut += "</tr>";
    }
    ut += "</table>";

// Ekstraoppgave: Sortere arrayet basert på NAVN
// La annenhver linje stå med fet skrift (bruk for eksempel <strong></strong>).


    function compare(a, b) {
        if (a.navn < b.navn) {
            return -1; //false, for a skal være større enn b og komme øverst
        }
        if (a.navn > b.navn) {
            return 1;
        }
        return 0;
    }

    personRegisterSortert = personRegister.sort(compare);

    ut += "<br /><br />";
    ut += "Sortert og annenhver linje stå med fet skrift:<br />";
    ut += "<table><tr>" +
        "<th>Navn</th><th>Adresse</th><th>Telefonnr</th>" +
        "</tr>";


    let teller = 0;

    for (let p of personRegisterSortert) {
        if (teller % 2 == 0) {
            ut += "<tr>";
            ut += "<td>" + p.navn + "</td><td>" + p.adresse + "</td><td>" + p.telefonnr + "</td>";
            ut += "</tr>";
        } else {
            ut += "<tr>";
            ut += "<td><strong>" + p.navn + "</strong></td><td><strong>" + p.adresse +
                "</strong></td><td><strong>" + p.telefonnr + "</strong></td>";
            ut += "</tr>";
        }
        teller++;
    }
    ut += "</table>";

    // Med Fnr og kvinner i fet skrift
    ut += "<br/> <br/>";
    ut += "Med f.nr. og kvinner i fet skrift: <br/>";
    ut += "<table><tr>" +
        "<th>Navn</th><th>Adresse</th><th>Telefonnr</th><th>Fødselsnummer</th>" +
        "</tr>";


    personRegisterSortert[0].fnr = 11028348143;
    personRegisterSortert[1].fnr = 14078548977;
    personRegisterSortert[2].fnr = 21059944243;
    personRegisterSortert[3].fnr = 30110043316;
    personRegisterSortert[4].fnr = 30120141197;

    for (let p of personRegisterSortert) {
        if (p.fnr.toString()[8] % 2 == 0) {
            ut += "<tr>";
            ut += "<td><strong>" +
                p.navn +
                "</strong></td><td><strong>" +
                p.adresse +
                "</strong></td><td><strong>" +
                p.telefonnr +
                "</strong></td><td><strong>" +
                p.fnr +
                "</strong></td>";
            ut += "</tr>";
        } else {
            ut += "<tr>";
            ut +=
                "<td>" +
                p.navn +
                "</td><td>" +
                p.adresse +
                "</td><td>" +
                p.telefonnr +
                "</td><td>" +
                p.fnr +
                "</td>";
            ut += "</tr>";
        }
    }
    ut += "</table>";
    document.getElementById("personRegister").innerHTML = ut;
}

function skjulPersonRegister() {
    document.getElementById("personRegister").innerHTML = "";
}







