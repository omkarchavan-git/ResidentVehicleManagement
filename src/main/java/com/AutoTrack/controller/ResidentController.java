package com.AutoTrack.controller;

import com.AutoTrack.Service.ResidentService;
import com.AutoTrack.entity.Resident;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://resident-vehicle-managements.vercel.app")
@RequestMapping("/resident")

public class ResidentController {

    @Autowired
    private ResidentService residentService;

    // add resident with vehicles
    @PostMapping("/saveResidents")
    public ResponseEntity<?> addResident(@Valid @RequestBody Resident resident) {
         residentService.saveResident(resident);
        return new ResponseEntity<>("saved Resident", HttpStatus.CREATED);
    }

    // add list of resident once at a time
    @PostMapping("/saveAllResident")
    public ResponseEntity<?> addAllResident(@Valid @RequestBody List<Resident> residentList)
    {
        List<Resident> residentList1 = residentService.addAllResident(residentList);
        return new ResponseEntity<>(residentList1, HttpStatus.CREATED);
    }

    // API to get all resident
    @GetMapping("/getAllResident")
    public ResponseEntity<List<Resident>> getallresidents () {
        List<Resident> residentList = residentService.getAllResident();
        return new ResponseEntity<>(residentList,HttpStatus.OK);
    }

    // get Resident data by name
    @GetMapping("/getByName")
    public ResponseEntity<?> getByName(@RequestParam(required = false) String firstname,
                                       @RequestParam(required = false) String lastname) {
        // validation: no numbers allowed
        if ((firstname != null && firstname.matches(".*\\d.*")) ||
                (lastname != null && lastname.matches(".*\\d.*"))) {
            return ResponseEntity.badRequest().body("Firstname/Lastname should not contain numbers.");
        }
        List<Resident> residents = residentService.findByName(firstname, lastname);
        if (residents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("First name OR last name is not Exist...");
        }
        return ResponseEntity.ok(residents);
    }

    // Delete Resident data by id
    @DeleteMapping("/deleteResidentById/{id}")
    public ResponseEntity<Resident> deleteById(@PathVariable("id") int id)
    {
        Resident resident = residentService.deleteResidentById(id);
        return new ResponseEntity<>(resident, HttpStatus.OK);
    }

//    Update resident by id
    @PutMapping("/updateResidentById/{id}")
    public ResponseEntity<?> updateResidentByid (@PathVariable("id") int id, @RequestBody Resident resident)
    {
      Resident resident1 = residentService.updateById(id, resident);
       return new ResponseEntity<>(resident1, HttpStatus.OK);
    }


    // API to update by flatNo
    @PutMapping("/updateByFlatNo")
    public ResponseEntity<Resident> updateByflatNo(@RequestParam("flatno") String flatno, @RequestBody Resident resident)
    {
      Resident resident1 =   residentService.updateByFlatNo(flatno, resident);
      return new ResponseEntity<>(resident1, HttpStatus.OK);
    }

    // delete resident data by flat no
    @DeleteMapping("/deleteByFlatNo/{flatno}")
    public ResponseEntity<String> deleteByflatno(@PathVariable("flatno") String flatno)
    {
        residentService.deleteByFlaytNo(flatno);
        return new ResponseEntity<>("Resident with Flat Number  : " + flatno + " Deleted", HttpStatus.OK);
    }

    // API to find Resident by flatno
    @GetMapping("/findByFlatNo/{flatno}")
    public ResponseEntity<Resident> findbyflatno(@PathVariable("flatno") String flatno, Resident resident)
    {
       Resident resident1 = residentService.getByflatNo(flatno, resident);
       return new ResponseEntity<>(resident1, HttpStatus.OK);
    }

    // API to  Find Resident by Parking lot
    @GetMapping("/getResidentByParkinglot/{parkinglot}")
    public ResponseEntity<Resident> findbyparkinglot(@PathVariable("parkinglot") String parkinglot, Resident resident)
    {
       Resident resident1 = residentService.getResidentByParkinglot(parkinglot, resident);
       return new ResponseEntity<>(resident1, HttpStatus.OK);
    }

    // API to filter by Resident type
    @GetMapping("/filterByResidentType")
    public ResponseEntity<List<Resident>> filterByResidentType(@RequestParam("residentType")String residentType)
    {
      List<Resident>  residentList =  residentService.fiterbyResidentType(residentType);
      return new ResponseEntity<>(residentList, HttpStatus.OK);
    }

}
