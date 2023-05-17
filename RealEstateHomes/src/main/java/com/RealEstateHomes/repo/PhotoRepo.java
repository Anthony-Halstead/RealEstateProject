package com.RealEstateHomes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.RealEstateHomes.entity.Photo;

public interface PhotoRepo extends JpaRepository<Photo, Integer>{
	
    @Query(value="select * from photo where property_ID = ?1", nativeQuery = true) //make sure field matches database exactly
    public List<Photo> findByPropertyID(Integer propertyID);

}
