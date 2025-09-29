package com.AutoTrack.serviceImpl;

import com.AutoTrack.Service.VehicleService;
import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepo vehiclrRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Override
    public List<Vehicles> getallvehiclesdata() {
        List<Vehicles> vehiclesList1 = vehiclrRepo.findAll();
        return vehiclesList1;
    }

    @Override
    public Resident getResidentByRegNum(String regNum) {

        Vehicles vehicle = vehiclrRepo.findByRegNum(regNum)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with registration number: " + regNum));

        return vehicle.getResident();
    }


    @Override
    public Vehicles createVehicle(Vehicles vehicles, int residentId) {

            Resident resident =  residentRepo.findById(residentId)
                    .orElseThrow( () -> new IllegalArgumentException("Resident not found with id : " + residentId));

            // validate reg num
            if (vehicles.getRegNum() == null || vehicles.getRegNum().trim().isEmpty())
            {
                throw new IllegalArgumentException("Vehicle reg num is not valid");
            }

            // set resident to vehicle
            vehicles.setResident(resident);
            vehicles.setIntime(LocalDateTime.now().withNano(0));

            return vehiclrRepo.save(vehicles);

    }







}
