package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import com.AutoTrack.serviceImpl.VehicleServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleServiceImpl vehicleServiceImpl;

    // API to add vehicle data with resident
    @PostMapping("/addVehicle")
    public ResponseEntity<?> addVehicle (@Valid @RequestBody Vehicles vehicles,
                                         @RequestParam int residentId)
    {
        try {
            Vehicles savedVehicle = vehicleServiceImpl.createVehicle(vehicles, residentId);
            return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // API to get Resident details by Vehicle Registration Number
    @GetMapping("/getResidentByRegNum")
    public ResponseEntity<?> getResidentByRegNum(@RequestParam String regNum) {
        try {
            Resident resident = vehicleServiceImpl.getResidentByRegNum(regNum);
            return ResponseEntity.ok(resident);         //  Only Resident details
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
