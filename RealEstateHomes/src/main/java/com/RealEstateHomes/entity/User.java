package com.RealEstateHomes.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


// Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
// Tells what table the object is coming from
@Table(name="user")
public class User {
    // ID lets you know its an id
    @Id
    // Column maps to the same name as the column name in the database, it is case sensitive
    @Column(name = "id")
    // This will configure your id to be auto generated, now you don't need a setter for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "isAdmin", nullable = false)
    private Boolean isAdmin;
  
	@OneToMany 
	@JoinColumn(name="user_Id",referencedColumnName="id")
    private List<Property> userProperties;

    //----------------------------///
    public User() {}
    
    public Boolean getIsAdmin() {
 		return isAdmin;
 	}

 	public void setIsAdmin(Boolean isAdmin) {
 		this.isAdmin = isAdmin;
 	}

    public List<Property> getUserProperties() {
        return userProperties;
    }



    public void setUserProperties(List<Property> userProperties) {
        this.userProperties = userProperties;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", userName=" + email + ", password=" + password + "]";
    }
}
