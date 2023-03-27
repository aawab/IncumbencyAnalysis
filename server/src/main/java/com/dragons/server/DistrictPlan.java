import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class DistrictPlan {
    @Id
    private String name;
    
    private byte[] GeoJSON;
    private HashMap<Integer, District> districts;
}
