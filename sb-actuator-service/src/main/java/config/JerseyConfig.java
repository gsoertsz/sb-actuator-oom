/**
 * Copyright Transurban Pty. Ltd.
 */
package config;

import hello.HelloWorldController;
import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.springframework.stereotype.Component;

@Component
@ApplicationPath("/app")
public class JerseyConfig extends ResourceConfig {

  public JerseyConfig() {
    register(HelloWorldController.class);
  }

}
