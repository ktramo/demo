package com.krdemo.demo;

public class DemoUser {
	String id;
	String name;
	String avatar;

	public DemoUser(String id, String name) {
		this.id     = id;
		this.name   = name != null ? name : "Stranger " + Integer.toString((int)(Math.random() * 100000 + 1));
		this.avatar = "avatars/user" + Integer.toString((int)(Math.random() * 3 + 1)) + ".png";
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getAvatar() {
		return avatar;
	}
}
