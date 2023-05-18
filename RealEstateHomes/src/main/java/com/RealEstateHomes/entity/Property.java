package com.RealEstateHomes.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;



@Entity
@Table(name="Property")
public class Property {
    
 
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "number_of_bathrooms")
    private Integer numberOfBathrooms;

    @Column(name = "number_of_bedrooms")
    private Integer numberOfBedrooms;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "year_built")
    private Integer yearBuilt;

    @Column(name = "pets_allowed")
    private String isPetsAllowed;

    @Column (name = "date_added")
    private LocalDate dateAdded;

    @Column(name = "description")
    private String description;
    
    @Column(name = "price", scale = 2)
    private Double price;

    @Column(name = "is_sold")
    private Boolean isSold = false;
    
    @Column(name = "square_feet", scale = 2)
    private Double squareFeet;

	@Column(name = "sale_price")
    private Double salePrice;

    @Column(name = "date_sold", nullable = true)
    private LocalDate dateSold;
    
    @Column(name = "realator_info", nullable = true)
    private String realatorInfo;

	@OneToMany	    
	@JoinColumn(name="property_Id",referencedColumnName="id")
	private List<Photo> propertyPhotos;
	

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getSalePrice() {
		return salePrice;
	}

	public String getRealatorInfo() {
        return realatorInfo;
    }

    public void setRealatorInfo(String realatorInfo) {
        this.realatorInfo = realatorInfo;
    }

    public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public List<Photo> getPropertyPhotos() {
		return propertyPhotos;
	}
	public void addPropertyPhoto(Photo photo) {
		this.propertyPhotos.add(photo);
	}
	public void deletePropertyPhoto(Photo photo) {
		this.propertyPhotos.remove(photo);
	}

	public void setPropertyPhotos(List<Photo> propertyPhotos) {
		this.propertyPhotos = propertyPhotos;
	}

	 public Property() {
     }

    public Integer getId() {
        return id;
    }

    public Integer getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(Integer numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public Integer getNumberOfBedrooms() {
        return numberOfBedrooms;
    }

    public void setNumberOfBedrooms(Integer numberOfBedrooms) {
        this.numberOfBedrooms = numberOfBedrooms;
    }

    public Integer getYearBuilt() {
        return yearBuilt;
    }

    public void setYearBuilt(Integer yearBuilt) {
        this.yearBuilt = yearBuilt;
    }

    public String getIsPetsAllowed() {
        return isPetsAllowed;
    }

    public void setIsPetsAllowed(String isPetsAllowed) {
        this.isPetsAllowed = isPetsAllowed;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getIsSold() {
        return isSold;
    }

    public void setIsSold(Boolean isSold) {
        this.isSold = isSold;
    }

    public Double getSquareFeet() {
        return squareFeet;
    }

    public void setSquareFeet(Double squareFeet) {
        this.squareFeet = squareFeet;
    }

    public LocalDate getDateSold() {
        return dateSold;
    }

    public void setDateSold(LocalDate dateSold) {
        this.dateSold = dateSold;
    }

    @Override
    public String toString() {
        return "Property [id=" + id + ", numberOfBathrooms=" + numberOfBathrooms + ", numberOfBedrooms="
                + numberOfBedrooms + ", yearBuilt=" + yearBuilt + ", isPetsAllowed=" + isPetsAllowed + ", dateAdded="
                + dateAdded + ", description=" + description + ", price=" + price + ", isSold=" + isSold
                + ", squareFeet=" + squareFeet + ", salePrice=" + salePrice + ", dateSold=" + dateSold + "]";
    }

  
    
}