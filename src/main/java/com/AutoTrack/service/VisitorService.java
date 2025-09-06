package com.AutoTrack.service;

import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.eNum.VisitorType;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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


    // method to get Resident details using visitor regNum
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


    // method to update timeout of visitor
    public VisitorResidentDTO updateVisitorExitTime(String regNum, LocalDateTime exitTime) {
        Visitor visitor = visitorRepo.findByVehicalRegisterationNum(regNum)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Visitor not found for regNum: " + regNum));

        visitor.setTimeOut(exitTime);
        visitor.setActiveVisitor(false);   // auto mark inactive when timeout is set

        visitorRepo.save(visitor);

        return new VisitorResidentDTO(visitor);
    }

    // method to get visitor by their Type

    public List<VisitorResidentDTO> getVisitorsByFilter(List<String> types) {
        List<Visitor> visitors;

        if (types == null || types.isEmpty()) {
            // No filter → get all
            visitors = visitorRepo.findAll();
        } else {
            // Convert String → Enum
            List<VisitorType> visitorTypes = types.stream()
                    .map(String::toUpperCase)
                    .map(VisitorType::valueOf)
                    .toList();

            visitors = visitorRepo.findByVisitorTypeIn(visitorTypes);
        }

        // Convert Entity → DTO
        return visitors.stream()
                .map(VisitorResidentDTO::new)
                .toList();
    }

}
