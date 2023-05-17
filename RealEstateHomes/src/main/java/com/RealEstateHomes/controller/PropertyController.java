package com.RealEstateHomes.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.RealEstateHomes.entity.Property;
import com.RealEstateHomes.entity.Photo;
import com.RealEstateHomes.service.PropertyService;
import com.RealEstateHomes.service.PhotoService;

@RestController
@RequestMapping(value="/property")
@CrossOrigin("*")

public class PropertyController {
    
	@Autowired
	PropertyService propertyService;
	
	@Autowired
	PhotoService photoService;
	
	 @RequestMapping(
		  		value = "/save",
		  		consumes = MediaType.APPLICATION_JSON_VALUE,
		  		produces = MediaType.APPLICATION_JSON_VALUE,
		  		method = RequestMethod.POST
		  )
	 public ResponseEntity<Object> save(@RequestBody Property property) {

	      try {
	          Property savedProperty = propertyService.save(property);
	          return new ResponseEntity<Object>(savedProperty, HttpStatus.CREATED);
	      } catch (Exception e) {

	          return new ResponseEntity<Object>(e, HttpStatus.BAD_REQUEST);
	      } catch (Error e) {

	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }
	 
	  @RequestMapping(
		      value="/findPropertyById/{id}",
			  consumes = MediaType.APPLICATION_JSON_VALUE,
		      produces = MediaType.APPLICATION_JSON_VALUE,
		      method = RequestMethod.GET
		  )
		  public ResponseEntity<Object> findPropertyById(@PathVariable Integer id) {

		      try {
		          Property foundProperty = propertyService.findById(id);
		          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
		      } catch (Exception e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		      } catch (Error e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		      }

		  }
	  @RequestMapping(
		      value="/addPhoto/{id}",
			  consumes = MediaType.APPLICATION_JSON_VALUE,
		      produces = MediaType.APPLICATION_JSON_VALUE,
		      method = RequestMethod.POST
		  )
		  public ResponseEntity<Object> addPhoto (@RequestBody Photo photo, @PathVariable Integer id) {

		      try {
		    	  photoService.save(photo);
		          Property foundProperty = propertyService.findById(id);
		          foundProperty.addPropertyPhoto(photo);
		          propertyService.update(foundProperty);
		         
		          
		          
		          
		          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
		      } catch (Exception e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		      } catch (Error e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		      }

		  }
	  @RequestMapping(
		      value="/deletePhoto/{id}",
			  consumes = MediaType.APPLICATION_JSON_VALUE,
		      produces = MediaType.APPLICATION_JSON_VALUE,
		      method = RequestMethod.DELETE
		  )
		  public ResponseEntity<Object> deltePhoto (@RequestBody Photo photo, @PathVariable Integer id) {

		      try {
		    	  
		          Property foundProperty = propertyService.findById(id);
		          foundProperty.deletePropertyPhoto(photo);
		          propertyService.update(foundProperty);
		          photoService.deleteById(photo.getId());
		         
		          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
		      } catch (Exception e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		      } catch (Error e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		      }

		  }
	  
	  @RequestMapping(
		      value="/findPropertiesByCity/{city}",
		      consumes = MediaType.APPLICATION_JSON_VALUE,
		      produces = MediaType.APPLICATION_JSON_VALUE,
		      method = RequestMethod.GET
		  )
		  public ResponseEntity<Object> findPropertiesByCity(@PathVariable String city) {

		      try {
		    	  String cityWC = "*"+city+"*";
		          List <Property> foundProperty = propertyService.findByCity(cityWC);
		          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
		      } catch (Exception e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		      } catch (Error e) {
		          System.out.println(e);
		          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		      }

		  }
	  
		@RequestMapping(
			      value="/findPropertiesByState/{state}",
	
			      produces = MediaType.APPLICATION_JSON_VALUE,
			      method = RequestMethod.GET
		  		)
			  public ResponseEntity<Object> findPropertiesByState(@PathVariable String state) {
					try{ 
					  String stateWC = "%"+state+"%";
			          List <Property> foundProperty = propertyService.findByState(stateWC);
			          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
			      } catch (Exception e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }  
		// @RequestMapping(
		// 	      value="/findAuctionPropertys",
		// 	      produces = MediaType.APPLICATION_JSON_VALUE,
		// 	      method = RequestMethod.GET
		// 	  )
		// 	  public ResponseEntity<Object> findAuctionPropertys() {

		// 	      try {
		// 	    	  LocalDate date = LocalDate.now().minusDays(119);
		// 	          List<Property> auctionPropertys = propertyService.findAuctionPropertys(date);
		// 	          return new ResponseEntity<Object>(auctionPropertys, HttpStatus.OK);
		// 	      } catch (Exception e) {
		// 	          System.out.println(e);
		// 	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		// 	      } catch (Error e) {
		// 	          System.out.println(e);
		// 	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		// 	      }

		// 	  }
		// @RequestMapping(
		// 	      value="/findRegPropertys",
		// 	      produces = MediaType.APPLICATION_JSON_VALUE,
		// 	      method = RequestMethod.GET
		// 	  )
		// 	  public ResponseEntity<Object> findRegPropertys() {

		// 	      try {
		// 	    	  LocalDate date = LocalDate.now().minusDays(120);
		// 	          List<Property> regPropertys = propertyService.findRegPropertys(date);
		// 	          return new ResponseEntity<Object>(regPropertys, HttpStatus.OK);
		// 	      } catch (Exception e) {
		// 	          System.out.println(e);
		// 	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		// 	      } catch (Error e) {
		// 	          System.out.println(e);
		// 	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		// 	      }

		// 	  }
		@RequestMapping(
			      value="/findPropertiesSold/{startDate}/{endDate}",
			      produces = MediaType.APPLICATION_JSON_VALUE,
			      method = RequestMethod.GET
			  )
			  public ResponseEntity<Object> findPropertiesSold(@PathVariable String startDate, @PathVariable String endDate) {
					
			      try {
			    	  
			    	  LocalDate dateFrom = LocalDate.parse(startDate);
			    	  LocalDate dateTo = LocalDate.parse(endDate);
			          List<Property> propertiesSold = propertyService.findPropertiesSold(dateFrom, dateTo);
			          	for(Property c: propertiesSold) {
			          		System.out.println(c);
			          		}
			          return new ResponseEntity<Object>(propertiesSold, HttpStatus.OK);
			      } catch (Exception e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }
		@RequestMapping(
			      value="/findByPrice/{fromPrice}/{toPrice}",
			      produces = MediaType.APPLICATION_JSON_VALUE,
			      method = RequestMethod.GET
			  )
			  public ResponseEntity<Object> findPropertiesByPrice(@PathVariable Double fromPrice, @PathVariable Double toPrice) {
					
			      try {

			          List<Property> propertiesInRange = propertyService.findByPrice(fromPrice, toPrice);
			          return new ResponseEntity<Object>(propertiesInRange, HttpStatus.OK);
			      } catch (Exception e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }
		@RequestMapping(
			      value="/findPropertiesInInventory",
			      produces = MediaType.APPLICATION_JSON_VALUE,
			      method = RequestMethod.GET
			  )
			  public ResponseEntity<Object> findPropertiesInInventory() {

			      try {
			          List<Property> inventoryProperties = propertyService.findPropertiesInInventory();
			          return new ResponseEntity<Object>(inventoryProperties, HttpStatus.OK);
			      } catch (Exception e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }

			  @RequestMapping(
			      value="/updateProperty",
			      consumes = MediaType.APPLICATION_JSON_VALUE,
			      produces = MediaType.APPLICATION_JSON_VALUE,
			      method = RequestMethod.POST
			  )
			  public ResponseEntity<Object> updateProperty(@RequestBody Property property) {

			      try {
			          Property updatedProperty = propertyService.update(property);
			          return new ResponseEntity<Object>(updatedProperty, HttpStatus.OK);
			      } catch (Exception e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          System.out.println(e);
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }

			  @RequestMapping(
			      value="/deleteProperty/{id}",
			      method = RequestMethod.DELETE
			  )
			  public ResponseEntity<Object> deleteProperty(@PathVariable Integer id) {

			      try {
			          propertyService.deleteById(id);
			          return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
			      } catch (Exception e) {
			          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			      } catch (Error e) {
			          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
			      }

			  }

}
