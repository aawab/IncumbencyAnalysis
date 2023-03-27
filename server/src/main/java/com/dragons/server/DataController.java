package com.dragons.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import com.google.gson.Gson;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.IOException;

@RestController
public class DataController {

	Gson gson = new Gson();
	
	@Autowired
	private UserRepository userRepo;

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/plans")
	public String plans() {
		System.out.println("getting random plans!");
		String[] stuff = new String[]{"District Plan (Party Variation)", "District Plan (Ethnicity Variation)",
				"District Plan (Age Variation)"};
		return gson.toJson(stuff);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/states")
	public byte[] states() throws IOException{
		Path path = Paths.get("./geojson/states/Arizona.json");
		return Files.readAllBytes(path);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/Colorado2022")
	public byte[] ColoradoDistricts2022() throws IOException{
		Path path = Paths.get("./geojson/congressionaldistricts/2022/codistricts.json");
		return Files.readAllBytes(path);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/Arizona2022")
	public byte[] ArizonaDistricts2022() throws IOException{
		Path path = Paths.get("./geojson/congressionaldistricts/2022/azdistricts.json");
		return Files.readAllBytes(path);
	}

	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/Ohio2022")
	public byte[] OhioDistricts2022() throws IOException{
		Path path = Paths.get("./geojson/congressionaldistricts/2022/ohdistricts.json");
		return Files.readAllBytes(path);
	}
}