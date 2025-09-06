package com.AutoTrack.service;

import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VisitorService {

    @Autowired
    private VisitorRepo visitorRepo;


    @Autowired
    private ResidentRepo residentRepo;

    // Method to add data
    public Visitor addVisitor(Visitor visitor) {
        return visitorRepo.save(visitor);
    }


    public List<VisitorResidentDTO> getVisitorResidentDetailsByRegNum(String regNum) {
        List<Visitor> visitors = visitorRepo.findByVehicalRegisterationNum(regNum);

        if (visitors.isEmpty()) {
            throw new RuntimeException("No visitor found with vehicle registration number: " + regNum);
        }

        // Convert Visitor list to DTO list
        return visitors.stream()
                .map(VisitorResidentDTO::new)
                .collect(Collectors.toList());
    }

}
