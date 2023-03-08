package com.dragons.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.google.gson.Gson;

@RestController
public class HelloController {

	Gson gson = new Gson();

	@GetMapping("/")
	public String index() {
        System.out.println("request made!");
		return "<h1>Incumbency analysis server request received!</h1>";
	}
	@GetMapping("/test")
	public String test() {
		System.out.println("test made!");
		return "<h1> Test worked! </h1>";
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