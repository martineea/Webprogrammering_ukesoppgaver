package Valutakalkulator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

// APACHE TOMAT SERVER-SIDEN

@RestController
public class ValutaController {
    private ArrayList<Valuta> valutaRegister = new ArrayList<>();

    @GetMapping("/load")
    public void load() { //har ingen parametre
        Valuta SEK = new Valuta("SEK", 0.85);
        Valuta USD = new Valuta("USD", 9.5);
        Valuta EUR = new Valuta("EUR", 9.0);

        valutaRegister.add(SEK);
        valutaRegister.add(USD);
        valutaRegister.add(EUR);
    }

    @GetMapping("/konverter")
    public double konverter(Valuta valuta) {
        double kurs = 0;

        for (Valuta enValuta : valutaRegister) {
            if (enValuta.getSort().equals(valuta.getSort())) {
                kurs = valuta.getKurs() * enValuta.getKurs();
                // når vi sier valuta.getKurs er det snakk om beløpet
                // så dvs at valuta sin kurs er faktisk beløpet!
            }
        }
        return kurs;
    }
}
