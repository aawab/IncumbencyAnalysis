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
@Scope("session")
@SessionAttributes({"state", "plan"})
public class Controller {

	Gson gson = new Gson();

	@Autowired
	private StateRepository stateRepo;

	@CrossOrigin(origins="http://localhost:3000")
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

		return gson.toJson(res);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/state/{state}")
	public String getState(@PathVariable("state") String state, HttpServletRequest req) throws IOException{
		System.out.println("Grabbing state " + state);
		State stateData = stateRepo.findById(state).get();

		HttpSession s = req.getSession();
		s.setAttribute("state", stateData);

		// GET CURRENT PLAN ATTRIBUTE, REPLACE PLAN GEOJSON WITH ACTUAL GEOJSON
		String plan = (String) (s.getAttribute("plan"));
		System.out.println("Plan " + plan);
		String pathString = stateData.getPlan("2022").getGeoJSON();

		Path path = Paths.get(pathString);
		String newJSON = new String(Files.readAllBytes(path));

		//SETUP DISTRICTPLAN WITH GEOJSON AND MAKE IT THE ONLY VALUE INSIDE PLANS
		stateData.getPlan("2022").setGeoJSON(newJSON);
		stateData.setPlans(new DistrictPlan[]{stateData.getPlan("2022")});

		return gson.toJson(stateData);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/plan/{plan}")
	public String setPlan(@PathVariable("plan") String plan, HttpServletRequest req) throws IOException{
		
		System.out.println("Setting plan " + plan);
		
		HttpSession s = req.getSession();
		s.setAttribute("plan", plan);

		State state = (State) s.getAttribute("state");
		String pathString = state.getPlan(plan).getGeoJSON();

		Path path = Paths.get(pathString);
		String newJSON = new String(Files.readAllBytes(path));

		state.getPlan(plan).setGeoJSON(newJSON);

		return "test";
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
		System.out.println("Retrieving random plans!");
		String[] stuff = new String[]{"District Plan (Party Variation)", "District Plan (Ethnicity Variation)",
				"District Plan (Age Variation)"};
		return gson.toJson(stuff);
	}
}