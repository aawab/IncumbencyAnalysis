package com.dragons.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Scope;
import com.google.gson.Gson;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Optional;
import java.util.List;
import jakarta.servlet.http.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class Controller {

	Gson gson = new Gson();

	@Autowired
	private StateRepository stateRepo;

	@GetMapping("/states")
	public String getStates(HttpServletRequest req) throws IOException{

		List<State> res = stateRepo.findAll();

		// Reduce state object size to only include name and borders
		for (State st : res){
			st.setEnsemble(null);
			st.setPlans(null);
		}

		HttpSession s = req.getSession();
		s.setAttribute("plan", "2022");

		System.out.println(s.getAttribute("plan"));
		System.out.println("/states id = " + s.getId());

		return gson.toJson(res);
	}

	@GetMapping("/state/{state}")
	public String getState(@PathVariable("state") String state, HttpSession s) throws IOException{
		System.out.println("Grabbing state " + state);
		State stateData = stateRepo.findById(state).get();

		s.setAttribute("state", stateData);

		// GET CURRENT PLAN ATTRIBUTE, REPLACE PLAN GEOJSON WITH ACTUAL GEOJSON
		if(s.getAttribute("plan")==null){s.setAttribute("plan","2022");}
		String plan = (String) (s.getAttribute("plan"));
		System.out.println("Plan " + plan);
		System.out.println("One state id = " + s.getId());
		String pathString = stateData.getPlan(plan).getGeoJSON();

		Path path = Paths.get(pathString);
		String newJSON = new String(Files.readAllBytes(path));

		//SETUP DISTRICTPLAN WITH GEOJSON AND MAKE IT THE ONLY VALUE INSIDE PLANS
		stateData.getPlan(plan).setGeoJSON(newJSON);
		stateData.setPlans(new DistrictPlan[]{stateData.getPlan(plan)});

		return gson.toJson(stateData);
	}

	@GetMapping("/plan/{plan}")
	public String setPlan(@PathVariable("plan") String plan, HttpServletRequest req) throws IOException{
		
		System.out.println("Setting plan " + plan);
		
		HttpSession s = req.getSession();
		s.setAttribute("plan", plan);

		State state = (State) s.getAttribute("state");
		System.out.println(state.getPlans());
		String pathString = state.getPlan(plan).getGeoJSON();

		Path path = Paths.get(pathString);
		String newJSON = new String(Files.readAllBytes(path));

		state.getPlan(plan).setGeoJSON(newJSON);
		state.setPlans(new DistrictPlan[]{state.getPlan(plan)});

		return gson.toJson(state);
	}



	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/Colorado2022")
	public byte[] ColoradoDistricts2022() throws IOException{
		Path path = Paths.get("./geojson/congressionaldistricts/2022/codistricts.json");
		return Files.readAllBytes(path);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/plans")
	public String plans(HttpSession s) {
		System.out.println("random names id = " + s.getId());
		System.out.println("Retrieving random plans!");
		String[] stuff = new String[]{"District Plan (Party Variation)", "District Plan (Ethnicity Variation)",
				"District Plan (Age Variation)"};
		return gson.toJson(stuff);
	}
}