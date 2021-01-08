package ukeoppg.webprog.ukesoppgave;

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
        if (!rep.lagreRegister(register)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
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
        Register register = rep.hentEnKunde(id);
        if (register == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
        }
        return register;
    }

    @PostMapping("/endreEnKunde")
    public void endreEnKunde(Register register, HttpServletResponse response) throws IOException {
        if(!rep.endreEnKunde(register)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i databasen - prøv igjen senere");
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
}

