package com.AutoTrack.serviceImpl;

import com.AutoTrack.Service.VisitorService;
import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.eNum.VisitorType;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class VisitorServiceImpl implements VisitorService {

    @Autowired
    private VisitorRepo visitorRepo;

    @Autowired
    private ResidentRepo residentRepo;

    // Method to add data
    @Override
    public Visitor addVisitor(Visitor visitor) {
        return visitorRepo.save(visitor);
    }

    // method to get Resident details using visitor regNum
    // method to get Resident details using visitor regNum
    @Override
    public VisitorResidentDTO getVisitorResidentDetailsByRegNum(String regNum) {
        Visitor visitor = visitorRepo.findByVehicalRegisterationNum(regNum)
                .orElseThrow(() -> new RuntimeException("No visitor found with vehicle registration number: " + regNum));

        return new VisitorResidentDTO(visitor);
    }

    // method to update timeout of visitor
    @Override
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
    @Override
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

    // updated method to add outTime and update the Duration Hours
    // Update timeOut and auto-calculate visitDuration
    @Override
    public Visitor updateVisitorExit(String vehicalRegisterationNum, LocalDateTime timeOut) {
        Visitor visitor = visitorRepo.findByVehicalRegisterationNum(vehicalRegisterationNum)
                .orElseThrow(() -> new RuntimeException("Visitor not found with reg number: " + vehicalRegisterationNum));

        // set timeOut
        visitor.setTimeOut(timeOut);

        // calculate duration only if timeIn is present
        if (visitor.getTimeIn() != null && timeOut != null) {
            Duration duration = Duration.between(visitor.getTimeIn(), timeOut);
            long hours = duration.toHours();
            long minutes = duration.toMinutesPart();
            String formatted = String.format("%02d:%02d", hours, minutes);
            visitor.setVisitDuration(formatted);

            // mark visitor inactive
            visitor.setActiveVisitor(false);
        }
        return visitorRepo.save(visitor);
    }

    @Override
    public List<Visitor> getAllVisitor() {
        List<Visitor> visitorList = visitorRepo.findAll();
        return visitorList;
    }

    @Override
    public Visitor updateVisitor(int id, Visitor visitor) {

        Visitor existingVisitor = visitorRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Visitor Id not : " + id));

        if (visitor.getVisitorName() != null) existingVisitor.setVisitorName(visitor.getVisitorName());
        if(visitor.getVehicleName() != null) existingVisitor.setVehicleName(visitor.getVehicleName());
        if(visitor.getVehicalRegisterationNum() != null) existingVisitor.setVehicalRegisterationNum(visitor.getVehicalRegisterationNum());
        if (visitor.getVisitPurpose() != null) existingVisitor.setVisitPurpose(visitor.getVisitPurpose());
        if (visitor.getPhoneNumber() != null) existingVisitor.setPhoneNumber(visitor.getPhoneNumber());
        if(visitor.getTimeIn() != null ) existingVisitor.setTimeIn(visitor.getTimeIn());
        if (visitor.getTimeOut() != null)existingVisitor.setTimeOut(visitor.getTimeOut());
        if(visitor.getVisitDuration() != null) existingVisitor.setVisitDuration(visitor.getVisitDuration());
        if (visitor.getVisitorType() != null) existingVisitor.setVisitorType(visitor.getVisitorType());

        return visitorRepo.save(existingVisitor);

    }

}