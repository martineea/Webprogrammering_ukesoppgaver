package oslomet.webprog.ukesoppg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class MotorvognController {

    @Autowired
    private MotorvognRepository rep;

    @GetMapping("/hentBiler")
    public List<Bil> hentBiler() {
        return rep.hentBiler();
    }

    @PostMapping("/registrer")
    public void lagreRegister(Register register){
        rep.lagreRegister(register);
    }

    @GetMapping("/hentAlle")
    public List<Register> hentAlle(){
        return rep.hentAlle();
    }

    @GetMapping("hentEnKunde")
    public Register hentEnKunde(int id) {
        return rep.hentEnKunde(id);
    }

    @PostMapping("/endreEnKunde")
    public void endreEnKunde(Register register) {
        rep.endreEnKunde(register);
    }

     @GetMapping("/slettEnKunde")
    public void slettEnKunde(int id) {
        rep.slettEnKunde(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleKunder();
    }
}

