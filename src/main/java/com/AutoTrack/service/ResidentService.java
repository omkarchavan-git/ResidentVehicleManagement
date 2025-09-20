package com.AutoTrack.Service;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.exception.FieldMissingException;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;

public interface ResidentService {

    // to save Resident data with vehicles with having validations
    public Resident saveResident(Resident resident) ;

    // method to get all residents
    public List<Resident> getAllResident() ;

    //method to find by first name or lastname or both
    public List<Resident> findByName(String firstname, String lastname);

    // method to add multiple resident at once
    public List<Resident> addAllResident(@Valid List<Resident> residentList);

    // method to delete resident data by id
    public Resident deleteResidentById(int id) ;

    // method to update resident by name
    Resident updateresidentByName(Resident resident);

}
