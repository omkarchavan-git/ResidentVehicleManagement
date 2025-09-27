package com.AutoTrack.Service;

import com.AutoTrack.dtoClasses.VisitorDTO;
import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.entity.Visitor;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitorService {

    public Visitor addVisitor(Visitor visitor);

    // method to get Resident details using visitor regNum
    public VisitorResidentDTO getVisitorResidentDetailsByRegNum(String regNum);

    // method to update timeout of visitor
    public VisitorResidentDTO updateVisitorExitTime(String regNum, LocalDateTime exitTime);

    // method to get visitor by their Type
    public List<VisitorResidentDTO> getVisitorsByFilter(List<String> types);

    // updated method to add outTime and update the Duration Hours
    // Update timeOut and auto-calculate visitDuration
    public Visitor updateVisitorExit(String vehicalRegisterationNum, LocalDateTime timeOut);

    // get all visitor
    public List<VisitorDTO> getAllVisitor();

    //update visitor by id
    public Visitor updateVisitor(int id, Visitor visitor);

    // delete visitor by id
    public Visitor deleteVisitor(int id);
}



