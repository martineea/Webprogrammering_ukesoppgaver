package ukeoppgave.webprog;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MotorvognRepository {

    @Autowired
    public JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(MotorvognRepository.class);

    public boolean lagreRegister(Register register) {
        String sql = "INSERT INTO Register (personnr,navn,adresse,kjennetegn,merke,modell) VALUES(?,?,?,?,?,?)";
        try {
            db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                    register.getKjennetegn(), register.getMerke(), register.getModell());
            return true;
        }
        catch (Exception e) {
            logger.error("Feil i lagreKunde : "+e);
            return false;
        }
    }

    public List<Register> hentAlle() {
        String sql = "SELECT * FROM Register";
        try {
            return db.query(sql, new BeanPropertyRowMapper(Register.class));
        }
        catch (Exception e) {
            logger.error("Feil i hentAlle : "+e);
            return null;
        }
    }

    public Register hentEnKunde(int id) {
        String sql = "SELECT * FROM Register WHERE id=?";
        try {
            List<Register> enRegistrering = db.query(sql,new BeanPropertyRowMapper(Register.class), id);
            return enRegistrering.get(0);
        }
        catch (Exception e) {
            logger.error("Feil i hentEnKunde : "+e);
            return null;
        }
    }

    public boolean endreEnKunde (Register register) {
        String sql = "UPDATE Register SET personnr=?, navn=?, adresse=?, kjennetegn=?, merke=?, modell=? WHERE id=?";
        try {
            db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                    register.getKjennetegn(), register.getMerke(), register.getModell(), register.getId());
            return true;
        }
        catch (Exception e) {
            logger.error("Feil i endreEnKunde : "+e);
            return false;
        }
    }

    public boolean slettEnKunde (int id) {
        String sql = "DELETE FROM Register WHERE id=?";
        try {
            db.update(sql, id);
            return true;
        }
        catch (Exception e) {
            logger.error("Feil i slettEnKunde : "+e);
            return false;
        }
    }

    public boolean slettAlleKunder() {
        String sql = "DELETE FROM Register";
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            logger.error("Feil i slettAlleKunder : "+e);
            return false;
        }
    }

    public List<Bil> hentBiler() {
        String sql = "SELECT * FROM Bil";
        try {
            return db.query(sql, new BeanPropertyRowMapper(Bil.class));
        }
        catch (Exception e) {
            //logger.error("Feil i hentBiler : "+e);
            return null;
        }
    }

    // Funksjonen som krypterer passord
    // Tar det ukrypterte passordet inn, og bruker BCrypt
    // 1. argumentasjon er passordet i klartekst og legger til salting av passordet - genererer et salt
    // Tallet 15 sier noe om hvor sterkt saltet er
    // Saltet blir innbygd sammen med passordet i hashen

    private String krypterPassord(String passord){
        return BCrypt.hashpw(passord, BCrypt.gensalt(15));
    }


    private boolean sjekkPassord( String passord, String hashPassord){
        return BCrypt.checkpw(passord,hashPassord);
    }



    // Skal hente ut alle brukerene som matcher det brukernavnet som er skrevet inn - forhåpentligvis bare 1 match
    public boolean loggInn(String brukernavn, String passord) {
        String sql = "SELECT * FROM Bruker WHERE brukernavn = ?";
        try {

            List<Bruker> brukere = db.query(sql,new BeanPropertyRowMapper(Bruker.class),brukernavn);

            if (brukere != null) { // hvis vi får 1 eller flere brukere tilbake gjør vi en passordsjekk
                if(sjekkPassord(passord,brukere.get(0).getPassord())){
                    return true; // hvis brukeren er identifisert
                }
            }
            return false; // hvis vi ikke finner brukeren eller det er feil passord
        }
        catch (Exception e) {
            logger.error("Feil i logg inn "+e);
            return false;
        }
    }

    // Henter først ut alle brukere for å vite hva vi skal kryptere
    // Også lager vi en streng for å holde det krypterte pasordet: String kryptertPassord
    // og legger inn en feilhåndtering (try/ catch)
    // Henter så ut alle rader i brukertabellen som objekter
    // Når vi har listen, så looper vi igjennom den med for-løkke
    // og lager kryptert passord for hver rad/ hver bruker
    // Og til slutt så må vi også oppdatere passordene som ligger i databasen


    public boolean krypterAllePassord(){
        String sql = "SELECT * from Bruker";
        String kryptertPassord;
        try{
            List<Bruker> alleBrukere= db.query(sql,new BeanPropertyRowMapper(Bruker.class));
            for (Bruker b : alleBrukere){

                kryptertPassord = krypterPassord(b.getPassord());

                sql = "UPDATE Bruker SET passord=? where id=?";
                db.update(sql,kryptertPassord,b.getId());
            }
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}


    /*public boolean sjekkNavnOgPassord (Register register) {
        Object[] param = new Object[] {register.getNavn(), register.getPassord()};
        String sql = "SELECT COUNT(*) FROM Register WHERE navn=? AND passord=?";
        try {
            int antall = db.queryForObject(sql, param, Integer.class);
            if (antall>0) {
                return true;
            }
            return false;
        }
        catch (Exception e) {
            logger.error("Feil i sjekkNavnOgPassord :" + e);
            return false;
        }
    }*/
