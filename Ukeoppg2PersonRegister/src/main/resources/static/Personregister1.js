//Gjennomgått i timen på fredag 7.februar

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







