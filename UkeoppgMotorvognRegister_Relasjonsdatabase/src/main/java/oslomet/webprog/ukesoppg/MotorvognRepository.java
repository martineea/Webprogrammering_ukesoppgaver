package oslomet.webprog.ukesoppg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;


import java.util.ArrayList;
import java.util.List;

@Repository
public class MotorvognRepository {

    @Autowired
    public JdbcTemplate db;

    public void lagreRegister(Register register) {
        String sql = "INSERT INTO Register (personnr,navn,adresse,kjennetegn,merke,modell) VALUES(?,?,?,?,?,?)";
        db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                register.getKjennetegn(), register.getMerke(), register.getModell());
    }

    public List<Register> hentAlle() {
        String sql = "SELECT * FROM Register";
        return db.query(sql, new BeanPropertyRowMapper(Register.class));
    }

    public Register hentEnKunde(int id) {
        Object[] param = new Object[1];
        param[0] = id;
        String sql = "SELECT * FROM Register WHERE id=?";
        Register enRegistrering = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Register.class));
        return enRegistrering;
    }

    public void endreEnKunde (Register register) {
        String sql = "UPDATE Register SET personnr=?, navn=?, adresse=?, kjennetegn=? WHERE id=?";
        db.update(sql, register.getPersonnr(), register.getNavn(), register.getAdresse(),
                register.getKjennetegn(), register.getId());
    }

    public void slettEnKunde (int id) {
        String sql = "DELETE FROM Register WHERE id=?";
        db.update(sql, id);
    }

    public void slettAlleKunder() {
        String sql = "DELETE FROM Register";
        db.update(sql);
    }

    public List<Bil> hentBiler() {
        String sql = "SELECT * FROM Bil";
        return db.query(sql, new BeanPropertyRowMapper(Bil.class));
    }
}
