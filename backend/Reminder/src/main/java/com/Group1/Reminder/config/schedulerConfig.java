package com.Group1.Reminder.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

@Configuration
public class schedulerConfig {
    @Autowired
    private RestTemplate restTemplate;

    @Scheduled(cron = "0 0 2 * * ?")
    public void callEndpoint() {
        String url = "http://localhost:9993/reminder/sendsms/{remid}/{userid}";
        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Response from endpoint: " + response);
        } catch (Exception e) {
            System.err.println("Error calling endpoint: " + e.getMessage());
        }
    }
}
