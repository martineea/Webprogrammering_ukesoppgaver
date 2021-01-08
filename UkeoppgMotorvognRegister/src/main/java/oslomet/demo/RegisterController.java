package oslomet.demo;

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
    public void lagreRegister(Register innRegister) {
        allRegister.add(innRegister);
    }

    @GetMapping("/hentAlle")
    public List<Register> hentAlle() {
        return allRegister;
    }

    @GetMapping ("/slettAlle")
    public void slettAlle() {
        allRegister.clear();
    }
}
