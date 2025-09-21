package com.AutoTrack.Service;

import com.AutoTrack.entity.Resident;
import jakarta.validation.Valid;

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
   public Resident updateByName(String firstname, Resident resident);

   // update resident by flatno
    public Resident updateByFlatNo(String flatno, Resident resident);


    // delete by flatno
    public List<Resident> deleteByFlaytNo(String flatno);

    // get resident by flat No
    public Resident getByflatNo(String flatno, Resident resident);

    // Find resident by parking lot
    public Resident getResidentByParkinglot(String parkinglot, Resident resident);

    // method to filter by Resident type
    public List<Resident> fiterbyResidentType(String residentType);

}
