package com.krdemo.demo;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

	@Autowired
	private SessionData sessionData;

	// result for user
	private static String resultMap[][] = new String[][] {
		{"tie", "win", "lose"}, // paper against paper, rock, scissors
		{"lose", "tie", "win"}, // rock against paper, rock. scissors
		{"win", "lose", "tie"}  // scissors against paper, rock, scissors
	};

    private static final String[] selections = {"paper", "rock", "scissors"}; // sorted
    
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public DemoUser register(@RequestParam(value="name", required = false) String name) {
        final DemoUser user = new DemoUser(UUID.randomUUID().toString(), name);
        sessionData.setUser(user);
        return user;
    }

    @RequestMapping(value = "/play", method = RequestMethod.GET)
    public Map<String, String> play(@RequestParam(value="selection") String userSelection) {
    	final Map<String, String> response = new HashMap<>();

    	final String result;
    	final int userSelectionNumber = Arrays.binarySearch(selections, userSelection); 
    	if (sessionData.getUser() == null) {
    		result = "not registered";
    	} else if (userSelectionNumber < 0) {
    		result = "invalid selection";
    	} else {
    		final Random random = new Random();
    		final int computerSelectionNumber = random.nextInt(3);
    		final String computerSelection = selections[computerSelectionNumber];
    		response.put("computerSelection", computerSelection);
    		
    		result = resultMap[userSelectionNumber][computerSelectionNumber];
    	}

		response.put("result", result);

    	return response;
    }
}