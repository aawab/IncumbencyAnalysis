import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class State {
    @Id
    private String name;
    
    private HashMap<String, DistrictPlan> districtPlans;
    private Ensemble ensemble;
}
