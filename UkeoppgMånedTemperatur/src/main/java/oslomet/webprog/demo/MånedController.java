package oslomet.webprog.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// Dette er SERVER-siden?

@RestController
public class MånedController {

    private final Integer[] tempArray = new Integer[]{-3, -2, 2, 7, 12, 16, 18, 17, 12, 7, 3, -2};

    @PostMapping("/inn")
    public void innMåned(Måned innMåned) {
        tempArray.equals(innMåned);
    }

    @GetMapping("/vis")
    public Integer[] visTemperatur() {
        return tempArray;
    }
}