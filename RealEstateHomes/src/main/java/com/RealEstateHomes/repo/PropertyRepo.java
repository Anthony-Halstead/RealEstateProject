package com.RealEstateHomes.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.RealEstateHomes.entity.Property;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer> {
    

    @Query(value="select * from property where is_sold = 0 AND state LIKE ?1", nativeQuery = true)
    public List<Property> findByState(String state);
    
    @Query(value="select * from property where is_sold = 0 AND city LIKE ?1", nativeQuery = true)
    public List<Property> findByCity(String city);

    @Query(value="select * from property where is_sold = 0 AND square_feet LIKE ?1", nativeQuery = true)
    public List<Property> findBySquareFeet(Double squareFeet);
     
    @Query(value="select * from property where is_sold = 0 AND price BETWEEN ?1 AND ?2", nativeQuery = true)
    public List<Property> findByPrice(double fromPrice, double toPrice);
    
    @Query(value="select * from property where is_sold = 0 AND DATE(date_added) > DATE(?1)", nativeQuery = true)
    public List<Property> findRegProperties(LocalDate date);
    
    @Query(value="select * from property where is_sold = 0 AND DATE(date_added) < DATE(?1)", nativeQuery = true)
    public List<Property> findAuctionProperties(LocalDate date);
    
    @Query(value="select * from property where is_sold = 0", nativeQuery = true)
    public List<Property> findPropertiesInInvetory();
    
    @Query(value="select * from property where date_sold BETWEEN DATE(?1) AND DATE(?2)",nativeQuery = true)
    public List<Property> findPropertiesSold(LocalDate dateFrom, LocalDate dateTo);
	
	
}
