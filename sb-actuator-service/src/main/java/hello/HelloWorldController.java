package hello;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class HelloWorldController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private RestTemplate client;

    @GetMapping("/hello-world/{name}")
    @ResponseBody
    public Greeting sayHello(@PathVariable("name") String name) {
        ResponseEntity<String> response = client.getForEntity("http://nginx-mock/index.html", String.class);
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

}
