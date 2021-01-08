package oslomet.ukesoppg;

//import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegisterController {

    public final List<Register> allRegister = new ArrayList<>();

    @PostMapping("/registrer")
    public void lagreRegister(Register innRegister){
        allRegister.add(innRegister);
    }

    @GetMapping("/hentAlle")
    public List<Register> hentAlle(){
        return allRegister;
    }

    @GetMapping("/hentBiler")
    public List<Bil> hentBiler() {
        List <Bil> listBiler = new ArrayList<>();

        listBiler.add(new Bil("Volvo", "V30"));
        listBiler.add(new Bil("Volvo", "V70"));
        listBiler.add(new Bil("Volvo", "V90"));
        listBiler.add(new Bil("Audi", "A1"));
        listBiler.add(new Bil("Audi", "A4"));
        listBiler.add(new Bil("Audi", "A8"));
        return listBiler;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        allRegister.clear();
    }
}


