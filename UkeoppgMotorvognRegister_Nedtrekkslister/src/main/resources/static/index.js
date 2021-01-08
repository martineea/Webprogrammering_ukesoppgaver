$(function(){
    hentAlle();
    hentBiler();
});

function hentAlle() {
    $.get( "/hentAlle", function(data) {
        skrivUt(data);
    });
}
var test=[];
function hentBiler(){
    $.get( "/hentBiler", function(biler) {
        test=biler;
        formaterBilMerke(biler);
    });
}

function skrivUt(registere) {
    let ut = "<table class='table table-striped'>"+
        "<th>Personnr</th>" +
        "<th>Navn</th>" +
        "<th>Adresse</th>" +
        "<th>Kjennetegn</th>" +
        "<th>Merke</th>" +
        "<th>Type</th>";

    for (const register of registere) {
        ut += "<tr>"+
            "<td>" + register.personnr + "</td>" +
            "<td>" + register.navn + "</td>" +
            "<td>" + register.adresse + "</td>" +
            "<td>" + register.kjennetegn + "</td>" +
            "<td>" + register.merke + "</td>" +
            "<td>" + register.type + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#bilene").html(ut);
}

function formaterBilMerke(biler){
    let utMerke = "<select onchange='formaterBilType()' id='valgtBilMerke'>";
    let forrigeMerke = "";
    for(const bil of biler){
        if(bil.merke != forrigeMerke){
            utMerke +="<option value='"+bil.merke+"'>"+bil.merke+"</option>";
        }
        forrigeMerke = bil.merke;
    }
    utMerke +="</select>";
    $("#bilmerkene").html(utMerke);
}

//Må ha en setning hvor jeg henter ut det valgte merke fra selecten og tilordner det merke den gitte typen?

function formaterBilType(){ // inneholder typene av valgt bilmerke, sortert i en liste
    let bilTyper = test.filter((x)=> {
        return x.merke==$("#valgtBilMerke").val()
    });

    let utType = "<select id='valgtBilType'>";
    for(const bil of bilTyper){
        /*if (bil.merke == $("#valgtBilMerke").val()) { }*/
        utType +="<option value='"+bil.type+"'>"+bil.type+"</option>";
    }
    utType +="</select>";
    $("#biltypene").html(utType);
}

function registrer() {
    const register = {
        personnr : $("#personnr").val(),
        navn : $("#navn").val(),
        adresse : $("#adresse").val(),
        kjennetegn : $("#kjennetegn").val(),
        merke : $("#valgtBilMerke").val(),
        type : $("#valgtBilType").val()
    };
    $.post("/registrer", register, function(){
        hentAlle();
    });
    $("#personnr").val("");
    $("#navn").val("");
    $("#adresse").val("");
    $("#kjennetegn").val("");
    $("#bilmerkene").val("");
    $("#biltypene").val("");
}

function slettAlle() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}