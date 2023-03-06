package com.dragons.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
        System.out.println("request made!");
		return "<h1>Incumbency analysis server request received!</h1>";
	}

}