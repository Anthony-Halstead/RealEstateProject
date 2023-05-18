package com.RealEstateHomes.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RealEstateHomes.entity.Photo;
import com.RealEstateHomes.entity.Property;
import com.RealEstateHomes.entity.User;
import com.RealEstateHomes.repo.PropertyRepo;

@Service
public class PropertyService {
	
	@Autowired
	UserService userService;

	@Autowired
	PhotoService photoService;

	@Autowired
	PropertyRepo propertyRepo;
	
	public Property save(Property property, Integer id) {
		Property savedProperty = propertyRepo.save(property);
		userService.addPropertyToUser(id, savedProperty);
	    return savedProperty;
	}
	
	public Property update(Property property) throws Exception {

        if(property.getId() != null) {
	        return propertyRepo.save(property);
        }

        throw new AccountNotFoundException("Property doesnt exist, nothing updated");
	}
    
    public Property findById(Integer propertyId) throws Error {

        if(propertyRepo.findById(propertyId).isPresent()) {
            return propertyRepo.findById(propertyId).get();
        }

        throw new Error("No property id present, Property not found");
        
    }

    public List<Property> findByState(String state) throws Error {
        
        if(!propertyRepo.findByState(state).isEmpty()) {
            return propertyRepo.findByState(state);
        }
        

        throw new Error("No propertys by that make, Property not found");
        
    }
    
    public List<Property> findByCity(String city) throws Error {
            
        if(!propertyRepo.findByCity(city).isEmpty()) {
            return propertyRepo.findByCity(city);
        }
        
        throw new Error("No propertys with that model, Property not found");
        
    	}
    
    public List<Property> findByPrice(double fromPrice, double toPrice) throws Error {
      
   		if(!propertyRepo.findByPrice(fromPrice,toPrice).isEmpty()) {
   			return propertyRepo.findByPrice(fromPrice,toPrice);
   		}
        
   		throw new Error("No propertys listed in that price range");
        
    	}
    

	public List<Property> findAll() {
		
		List<Property> properties = propertyRepo.findAll();

		return properties;
	}
	
	public List<Property> checkForDiscount(List<Property> properties){
		
		for (Property property : properties) {
			LocalDate startDate = property.getDateAdded();
			LocalDate currentDate = LocalDate.now();
			long daysBetween = ChronoUnit.DAYS.between(startDate, currentDate);
	
			if (daysBetween > 90) {
				Double currentPrice = property.getPrice();
				Double discountedPrice = currentPrice * 0.9;
				property.setPrice(discountedPrice);
				propertyRepo.save(property);
			}
		}
		return properties;
	}

	public List<Property> findPropertiesInInventory() {
		List<Property> properties = propertyRepo.findPropertiesInInventory();
		return properties;
	}


	public List<Property> findPropertiesSold(LocalDate dateFrom,LocalDate dateTo) {
		List<Property> properties = propertyRepo.findPropertiesSold(dateFrom,dateTo);
		return properties;

	}
	
    public void deleteById(Integer id) {
	    propertyRepo.deleteById(id);
	}

	public Property setPropertySold(Integer propertyId) {

		Property property = findById(propertyId);
        property.setIsSold(true);
		property.setDateSold(LocalDate.now());
		return propertyRepo.save(property);
	}

	public Property setSoldPrice(Property property, Double price){
		property.setSalePrice(price); 
		return propertyRepo.save(property);
	}

	public List<Property> findByUserId(Integer userId) {
		List<Property> properties = propertyRepo.findByUser(userId);
		return properties;
	
	}

	public List<Property> findBySquareFoot(Double squareFeet) {
		List<Property> properties = propertyRepo.findBySquareFeet(squareFeet);
		return properties;
	}
	
    
}
