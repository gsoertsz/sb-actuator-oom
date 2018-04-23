package hello;

import java.util.concurrent.atomic.AtomicLong;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

@Path("/hello-world")
@Component
public class HelloWorldController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GET
    @Path("/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    @ResponseBody
    public Greeting sayHello(@PathParam("name") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

}
