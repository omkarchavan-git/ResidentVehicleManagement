package com.AutoTrack.serviceImpl;

import com.AutoTrack.Service.VehicleService;
import com.AutoTrack.dtoClasses.VehicleDTO;
import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepo vehiclrRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Override
    public List<VehicleDTO> getallvehiclesdata() {
        List<Vehicles> vehiclesList = vehiclrRepo.findAll();

        List<VehicleDTO> dtoList = vehiclesList.stream().map(vehicle -> {
            String resName = vehicle.getResident() != null
                    ? vehicle.getResident().getFirstname() + " " + vehicle.getResident().getLastname()
                    : "N/A";

            return new VehicleDTO(
                    vehicle.getId(),
                    vehicle.getRegNum(),
                    vehicle.getVehName(),
                    vehicle.getColor(),
                    vehicle.getVehicleType(),
                    vehicle.isVehActive(),
                    resName
            );
        }).collect(Collectors.toList());

        return dtoList;
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

    @Override
    public Vehicles updatevehicle(int id, Vehicles vehicles) {

        Vehicles existingvehicles = vehiclrRepo.findById(id)
                .orElseThrow( () -> new NoSuchElementException("Vehicle id : " + id + " Not found"));
        if (vehicles.getVehName() != null) existingvehicles.setVehName(vehicles.getVehName());
        if (vehicles.getRegNum() != null) existingvehicles.setRegNum(vehicles.getRegNum());
        if (vehicles.getVehicleType() != null) existingvehicles.setVehicleType(vehicles.getVehicleType());
        if (vehicles.getColor() != null) existingvehicles.setColor(vehicles.getColor());
        if (vehicles.getIntime() != null) existingvehicles.setIntime(vehicles.getIntime());
        if (vehicles.getOuttime() != null) existingvehicles.setOuttime(vehicles.getOuttime());
        if (vehicles.getResident() != null) existingvehicles.setResident(vehicles.getResident());

        //to update the resident as well
        if (vehicles.getResident() != null && vehicles.getResident().getId() != 0) {
            Resident res = residentRepo.findById(vehicles.getResident().getId())
                    .orElseThrow(() -> new NoSuchElementException("Resident not found"));
            existingvehicles.setResident(res);
        }


        return vehiclrRepo.save(existingvehicles);
    }


}
