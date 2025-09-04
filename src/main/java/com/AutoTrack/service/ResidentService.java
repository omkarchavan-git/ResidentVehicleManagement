package com.AutoTrack.service;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.exception.FieldMissingException;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VehiclrRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Component

public class ResidentService {

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private VehiclrRepo vehiclrRepo;


    // to save Resident data with vehicles with having validations
    public Resident saveResident(Resident resident) {

        // Manual validation
        if (resident.getFirstname() == null || resident.getFirstname().isBlank()) {
            throw new FieldMissingException("Firstname is mandatory");
        }
        if (resident.getLastname() == null || resident.getLastname().isBlank()) {
            throw new FieldMissingException("Lastname is mandatory");
        }
        if (resident.getContactno() == null) {
            throw new FieldMissingException("Contact number is mandatory");
        }
        if (resident.getFlatno() == null || resident.getFlatno().isBlank()) {
            throw new FieldMissingException("Flat number is mandatory");
        }
        if (resident.getEmail() != null && !resident.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new FieldMissingException("Email is invalid");
        }
        if (resident.getVehicles() != null) {
            resident.getVehicles().forEach(v -> {
                v.setResident(resident);
                v.setIntime(LocalDateTime.now().withNano(0));
            });
        }
        return residentRepo.save(resident);
    }


    // method to get all residents

    public List<Resident> getAllDevelopers() {
        List<Resident> residentList = residentRepo.findAll();
        return residentList;
    }


    //method to find by first name or lastname or both
    public List<Resident> findByName(String firstname, String lastname) {
        if (firstname != null && !firstname.isBlank() && lastname != null && !lastname.isBlank()) {
            return residentRepo.findByFirstnameIgnoreCaseAndLastnameIgnoreCase(firstname, lastname);
        } else if (firstname != null && !firstname.isBlank()) {
            return residentRepo.findByFirstnameIgnoreCase(firstname);
        } else if (lastname != null && !lastname.isBlank()) {
            return residentRepo.findByLastnameIgnoreCase(lastname);
        }
        return List.of();
    }

}

