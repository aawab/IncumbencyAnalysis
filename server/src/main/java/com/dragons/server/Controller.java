package com.dragons.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Optional;
import java.util.List;
import jakarta.servlet.http.*;

@RestController
public class Controller {

	Gson gson = new Gson();
	
	@Autowired
	private StateRepository stateRepo;

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/states")
	public String getStates() throws IOException{

		List<State> res = stateRepo.findAll();

		// Reduce state object size to only include name and borders
		for (State st : res){
			st.setEnsemble(null);
			st.setPlans(null);
		}

		return gson.toJson(res);
	}
 
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/state/{state}")
	public String getState(@PathVariable("state") String state, HttpServletRequest req){
		System.out.println("stuff");
		State stateData = stateRepo.findById(state).get();

		HttpSession s = req.getSession();
		s.setAttribute("state", stateData);
		s.setAttribute("plan", "2022");

		return gson.toJson(stateData);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/Colorado2022")
	public byte[] ColoradoDistricts2022() throws IOException{
		Path path = Paths.get("./geojson/congressionaldistricts/2022/codistricts.json");
		return Files.readAllBytes(path);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/plans")
	public String plans() {
		System.out.println("getting random plans!");
		String[] stuff = new String[]{"District Plan (Party Variation)", "District Plan (Ethnicity Variation)",
				"District Plan (Age Variation)"};
		return gson.toJson(stuff);
	}
}