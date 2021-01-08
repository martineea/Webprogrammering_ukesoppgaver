// oppretter  personer som nøkkel/ verdi-par:

const person1 = {
    navn: "Per Hansen",
    adresse: "Osloveien 9",
    telefonnummer: "99224466",
    fødselsnummer: "0101010101001"
};

const person2 = {
    navn: "Ole Olsen",
    adresse: "Lørenveien 1",
    telefonnummer: "55667788",
    fødselsnummer: "0101010101002"
};
const person3 = {
    navn: "Line Jensen",
    adresse: "Ensjøveien 27",
    telefonnummer: "00112233",
    fødselsnummer: "0101010101003"
};
const person4 = {
    navn: "Sigrid Sigurdson",
    adresse: "Tøyengata 5",
    telefonnummer: "44331100",
    fødselsnummer: "0101010101004"
};
const person5 = {
    navn: "Henrik Henriksen",
    adresse: "Oppdalstien 19",
    telefonnummer: "99224466",
    fødselsnummer: "0101010101002"
};

// oppretter et tomt array:
const personListe = []

// legger til personene i det tomme arrayet
personListe.push(person1);
personListe.push(person2);
personListe.push(person3);
personListe.push(person4);
personListe.push(person5);

let ut = "<table>" +
    "<tr>" +
    "<th>Navn</th>" +
    "<th>Adresse</th>" +
    "<th>Telefonnr+</th>" +
    "<th>Fødselsnummer</th>" +
    "</tr>";

function visPersonRegister() {
    for (let person of personListe) {
        ut += "<tr>" +
            "<td>" + person.navn +
            "<td>" + person.adresse + "</td>" +
            "<td>" + person.telefonnummer + "</td>" +
            "<td>" + person.fødselsnummer + "</td>" +
            "</td>" +
            "</tr>";
    }

    ut += "</table";
    let liste = document.getElementById("personRegister");
    liste.innerHTML = ut;
}

