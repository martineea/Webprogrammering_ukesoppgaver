package ukeoppgave.webprog;

public class Register {
    private int id;
    private String personnr;
    private String navn;
    private String adresse;
    private String kjennetegn;
    private String merke;
    private String modell;
    private String passord;

    public Register(int id, String personnr, String navn, String adresse,
                    String kjennetegn, String merke, String modell, String passord) {
        this.id = id;
        this.personnr = personnr;
        this.navn = navn;
        this.adresse = adresse;
        this.kjennetegn = kjennetegn;
        this.merke = merke;
        this.modell = modell;
        this.passord = passord;
    }

    public Register() {}
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getPersonnr() {
        return personnr;
    }
    public void setPersonnr(String personnr) {
        this.personnr = personnr;
    }
    public String getNavn() {
        return navn;
    }
    public void setNavn(String navn) {
        this.navn = navn;
    }
    public String getAdresse() {
        return adresse;
    }
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    public String getKjennetegn() {
        return kjennetegn;
    }
    public void setKjennetegn(String kjennetegn) {
        this.kjennetegn = kjennetegn;
    }
    public String getMerke() {
        return merke;
    }
    public void setMerke(String merke) {
        this.merke = merke;
    }
    public String getModell() {
        return modell;
    }
    public void setModell(String modell) {
        this.modell = modell;
    }
    public String getPassord() {
        return passord;
    }
    public void setPassord(String passord) {
        this.passord = passord;
    }

}
