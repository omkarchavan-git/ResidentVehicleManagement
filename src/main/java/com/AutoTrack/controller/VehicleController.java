package com.AutoTrack.controller;

import com.AutoTrack.Service.VehicleService;
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
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // API to add vehicle data with resident
    @PostMapping("/addVehicle")
    public ResponseEntity<?> addVehicle (@Valid @RequestBody Vehicles vehicles,
                                         @RequestParam int residentId)
    {
        try {
            Vehicles savedVehicle = vehicleService.createVehicle(vehicles, residentId);
            return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // API to get alll vehicles data
    @GetMapping("/getallVehicles")
    public ResponseEntity<List<Vehicles>> getallvehicles(List<Vehicles> vehiclesList)
    {
       List<Vehicles> vehiclesList1 =  vehicleService.getallvehiclesdata(vehiclesList);
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
}