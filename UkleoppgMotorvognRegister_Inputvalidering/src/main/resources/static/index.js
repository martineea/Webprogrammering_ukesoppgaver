$(function () { // kjøres når dokumentet er ferdig lastet
    hentAlle(); // henter alle registreringer i motorvognregisteret
});

function hentAlle() {
    $.get("/hentAlle", function (registere) {
        skrivUt(registere);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

// formaterKunder
function skrivUt(kunder) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Personnr</th>" +
        "<th>Navn</th>" +
        "<th>Adresse</th>" +
        "<th>Kjennetegn</th>" +
        "<th>Merke</th>" +
        "<th>Modell</th>" +
        "<th> </th>" +
        "<th> </th>" +
        "</tr>";

    for (let kunde in kunder) {
        ut += "<tr>" +
            "<td>" + kunder[kunde].personnr + "</td>" +
            "<td>" + kunder[kunde].navn + "</td>" +
            "<td>" + kunder[kunde].adresse + "</td>" +
            "<td>" + kunder[kunde].kjennetegn + "</td>" +
            "<td>" + kunder[kunde].merke + "</td>" +
            "<td>" + kunder[kunde].modell + "</td>" +
            /*"<td> <a class='btn btn-primary' href='endreKunde.html?id=" + kunder[kunde].id + "'>Endre</a></td>" +*/
            "<td> <button class='btn btn-primary' onclick='idTilEndring(" + kunder[kunde].id + ")'>Endre</button></td>" +
            "<td> <button class='btn btn-danger' onclick='slettEnKunde(" + kunder[kunde].id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#bilene").html(ut);
}

function idTilEndring(id) {
    window.location.href = "/endreKunde.html?" + id;
}

function slettEnKunde(id) {
    const url = "/slettEnKunde?id=" + id;
    $.get(url, function () {
        window.location.href = '/';
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}