import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<State,String>{
    @Query("{name: '?0'}")
    State findItemByName(String name);

    
}