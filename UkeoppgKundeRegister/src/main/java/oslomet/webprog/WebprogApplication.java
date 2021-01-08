package oslomet.webprog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebprogApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebprogApplication.class, args);
    }

    public static class Kunde {
        private String navn;
        private String adresse;

        public Kunde(String navn, String adresse) {
            this.navn = navn;
            this.adresse = adresse;
        }

        public Kunde() {

        }

        public String getNavn() {
            return navn;
        }

        public void setNavn(String navn) {
            this.navn = navn;
        }

        public String getAdresse() {
            return adresse;
        }

        public void setAdresse(String adresse) {
            this.adresse = adresse;
        }
    }
}
