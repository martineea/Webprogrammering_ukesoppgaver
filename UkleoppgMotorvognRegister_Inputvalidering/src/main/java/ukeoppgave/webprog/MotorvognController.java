package ukeoppgave.webprog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@RestController
public class MotorvognController {

    @Autowired
    private MotorvognRepository rep;

    private Logger logger = LoggerFactory.getLogger(MotorvognController.class);

    @GetMapping("/hentBiler")
    public List<Bil> hentBiler(HttpServletResponse response) throws IOException {
        List<Bil> hentBiler = rep.hentBiler();
        if (hentBiler == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
        }
        return hentBiler;
    }

    @PostMapping("/registrer")
    public void lagreRegister(Register register, HttpServletResponse response) throws IOException {
        if(validerRegistreringOK(register)) {
            if (!rep.lagreRegister(register)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
            }
        }
        else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i validering - prøv igjen senere");
        }
    }

    @GetMapping("/hentAlle")
    public List<Register> hentAlle(HttpServletResponse response) throws IOException {
        List<Register> alleRegister = rep.hentAlle();
        if (alleRegister == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i databasen - prøv igjen senere");
        }
        return alleRegister;
    }

    @GetMapping("hentEnKunde")
    public Register hentEnKunde(int id, HttpServletResponse response) throws IOException {
        Register enRegister = rep.hentEnKunde(id);
        if (enRegister == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
        }
        return enRegister;
    }

    @PostMapping("/endreEnKunde")
    public void endreEnKunde(Register register, HttpServletResponse response) throws IOException {
        if(validerRegistreringOK(register)) {
            if(!rep.endreEnKunde(register)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
            }
        }
        else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i validering - prøv igjen senere");
        }
    }

    @GetMapping("/slettEnKunde")
        public void slettEnKunde(int id, HttpServletResponse response) throws IOException {
        if (!rep.slettEnKunde(id)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
        }
    }

    @GetMapping("/slettAlle")
    public void slettAlle(HttpServletResponse response) throws IOException {
        if (!rep.slettAlleKunder()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
        }
    }

    // Server-validering (viktigere å validere her på SERVER enn på KLIENT)
    private boolean validerRegistreringOK(Register register) {
        String regexPersonnr = "[0-9]{11}";
        String regexNavn = "[a-zA-ZæøåÆØÅ. \\-]{2,30}"; // må bruke to backslasher \\ for å escape tegn
        String regexAdresse = "[0-9a-zA-zæøåÆØÅ ,\\-]{2,50}";
        String regexKjennetegn = "[A-Z][A-Z][0-9]{5}";
        String regexMerke = "[0-9a-zA-ZæøåÆØÅ. \\-]{2,10}";
        //String regexModell = "[0-9a-zA-ZæøåÆØÅ. \\-]{2,10}";
        // Dette er selve testene:
        boolean personnrOK = register.getPersonnr().matches(regexPersonnr);
        boolean navnOK = register.getNavn().matches(regexNavn);
        boolean adresseOK = register.getAdresse().matches(regexAdresse);
        boolean kjennetegnOK = register.getKjennetegn().matches(regexKjennetegn);
        boolean merkeOK = register.getMerke().matches(regexMerke);
        //boolean modellOK = register.getModell().matches(regexModell);
        // Sjekke booleanvariablene vi har laget:
        if(personnrOK && navnOK && adresseOK && kjennetegnOK && merkeOK) {
            return true;
        }
        logger.error("Valideringsfeil");
        return false;
    }
}

