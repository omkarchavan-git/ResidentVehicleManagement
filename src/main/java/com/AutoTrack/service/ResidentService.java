package com.AutoTrack.service;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VehiclrRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Component

public class ResidentService {

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private VehiclrRepo vehiclrRepo;



    // to save Resident data with vehicles
    public Resident saveResident(Resident resident) {

        resident.getVehicles().forEach( v -> {
            v.setResident(resident);
            v.setIntime(LocalDateTime.now());
        } );

        return residentRepo.save(resident);

    }

}
