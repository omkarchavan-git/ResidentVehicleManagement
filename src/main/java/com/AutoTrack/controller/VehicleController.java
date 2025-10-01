package com.AutoTrack.controller;

import com.AutoTrack.Service.VehicleService;
import com.AutoTrack.dtoClasses.VehicleDTO;
import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
@CrossOrigin(origins = "http://localhost:5173")

public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // API to add vehicle data with resident
    @PostMapping("/addVehicle")
    public ResponseEntity<?> addVehicle (@Valid @RequestBody Vehicles vehicles)
    {
        try {
            Vehicles savedVehicle = vehicleService.createVehicle(vehicles);
            return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // API to get all vehicles data
    @GetMapping("/getallVehicles")
    public ResponseEntity<List<VehicleDTO>> getallvehicles()
    {
       List<VehicleDTO> vehiclesList1 =  vehicleService.getallvehiclesdata();
       return new ResponseEntity<>(vehiclesList1, HttpStatus.OK);

    }

    // API to get Resident details by Vehicle Registration Number
    @GetMapping("/getResidentByRegNum")
    public ResponseEntity<?> getResidentByRegNum(@RequestParam String regNum) {
        try {
            Resident resident = vehicleService.getResidentByRegNum(regNum);
            return ResponseEntity.ok(resident);         //  Only Resident details
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //api to update the resident data
    @PatchMapping("/updateVehicleById/{id}")
    public ResponseEntity<Vehicles> updateVehicle(@PathVariable("id") int id, @RequestBody Vehicles vehicles)
    {
        Vehicles updatedVehicle =  vehicleService.updatevehicle(id, vehicles);
        return new ResponseEntity<>(updatedVehicle,HttpStatus.OK);
    }

    //api to delete
    @DeleteMapping("/deletevehiclebyid/{id}")
    public ResponseEntity<Vehicles> deletebyid(@PathVariable("id") int id)
    {
        Vehicles deletedVehicle = vehicleService.deletebyid(id);
        return new ResponseEntity<>(deletedVehicle,HttpStatus.OK);

    }
}