package com.AutoTrack.Service;

import com.AutoTrack.dtoClasses.VehicleDTO;
import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface VehicleService  {


    //method to get all vehicle data
    public List<VehicleDTO> getallvehiclesdata();

    public Resident getResidentByRegNum(String regNum);

    // method to add vehicle with resident
    public Vehicles createVehicle (Vehicles vehicles, int residentId);
}
