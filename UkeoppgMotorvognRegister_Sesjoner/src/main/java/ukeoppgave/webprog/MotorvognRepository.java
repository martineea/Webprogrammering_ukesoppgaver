package ukeoppgave.webprog;

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
        String sql = "INSERT INTO Register (personnr,navn,adresse,kjennetegn,merke,modell, passord) VALUES(?,?,?,?,?,?,?)";
        try {
            db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                    register.getKjennetegn(), register.getMerke(), register.getModell(), register.getPassord());
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
        String sql = "UPDATE Register SET personnr=?, navn=?, adresse=?, kjennetegn=?, merke=?, modell=?, passord?= WHERE id=?";
        try {
            db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                    register.getKjennetegn(), register.getMerke(), register.getModell(), register.getId(), register.getPassord());
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

    public boolean loggInn(String brukernavn, String passord) {
        String sql = "SELECT COUNT(*) FROM Bruker WHERE brukernavn = ? AND passord = ?";
        try {
            int funnetEnBruker = db.queryForObject(sql, Integer.class, brukernavn, passord);
            if(funnetEnBruker > 0) { // sjekker om det finnes minst 1 bruker med dette brukernavnet og passordet
                return true;
            } else {
                return false;
            }
        }
        catch (Exception e) {
            logger.error("Feil i logg inn"+e);
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
