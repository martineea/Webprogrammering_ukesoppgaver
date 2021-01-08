package oslomet.webprog.demo;

//private final Integer[] tempArray = new Integer[]{-3,-2,2,7,12,16,18,17,12,7,3,-2};

public class Måned {
    private String måned;

    public Måned(String måned) {
        this.måned = måned;
    }

    public Måned() {
    }

    public String getMåned() {
        return måned;
    }

    public void setMåned(String måned) {
        this.måned = måned;
    }

    /*switch(måned) {
        case "januar":
            måned = tempArray[0];
            break;
     }*/

    // Bruk videre en switch for å "oversette" månedsnavn til array-indeks.
}
