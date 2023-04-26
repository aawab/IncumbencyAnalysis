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
	public List<State> getStates(HttpServletRequest req) throws IOException{

		List<State> res = stateRepo.findAll();

		// Reduce state object size to only include name and borders
		for (State st : res){
			st.setPlans(null);
		}

		HttpSession s = req.getSession();
		s.setAttribute("plan", "2022");

		System.out.println(s.getAttribute("plan"));
		System.out.println("/states id = " + s.getId());

		return res;
	}

	@GetMapping("/distPlan/{state}")
	public DistrictPlan getDistrictPlan(@PathVariable("state") String state, HttpSession s){
		System.out.println("Grabbing state " + state);
		State stateData = stateRepo.findById(state).get();

		s.setAttribute("state", stateData);

		return stateData.getPlan((String)s.getAttribute("plan"));
	}

	@GetMapping("/ensemble/{state}")
	public Ensemble getEnsemble(@PathVariable("state") String state, HttpSession s){
		System.out.println("Grabbing ensemble for " + state);

		State state = s.getAttribute("state");

		return state.getEnsemble();
	}

	@GetMapping("/plan/{plan}")
	public void setPlan(@PathVariable("plan") String plan, HttpServletRequest req) throws IOException{
		
		System.out.println("Setting plan " + plan);
		
		HttpSession s = req.getSession();
		s.setAttribute("plan", plan);
	}

	@GetMapping("/plans")
	public String plans(HttpSession s) {
		String[] stuff = new String[]{"District Plan (Party Variation)", "District Plan (Ethnicity Variation)",
				"District Plan (Age Variation)"};
		return gson.toJson(stuff);
	}
}