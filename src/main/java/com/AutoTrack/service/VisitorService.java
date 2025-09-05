package com.AutoTrack.service;

import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    public VisitorResidentDTO getVisitorByRegNum(String regNum) {
        Visitor visitor = visitorRepo.findByVehicalRegisterationNumber(regNum)
                .orElseThrow(() -> new RuntimeException("Visitor not found with registration: " + regNum));

        return new VisitorResidentDTO(visitor);
    }

}
