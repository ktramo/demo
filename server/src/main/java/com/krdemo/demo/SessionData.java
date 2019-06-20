package com.krdemo.demo;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionData {
	DemoUser user;
	
	public SessionData() {
	}

	public DemoUser getUser() {
		return user;
	}

	public void setUser(DemoUser user) {
		this.user = user;
	}
}
