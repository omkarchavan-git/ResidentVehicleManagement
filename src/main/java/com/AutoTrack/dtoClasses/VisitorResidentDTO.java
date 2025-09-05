package com.AutoTrack.dtoClasses;

import com.AutoTrack.entity.Visitor;

import java.time.LocalDateTime;

public class VisitorResidentDTO {
    private String visitorName;
    private String visitPurpose;
    private LocalDateTime timeIn;
    private LocalDateTime timeOut;
    private Long phoneNumber;
    private boolean isActiveVisitor;
    private String visitorType;

    // Resident details
    private String residentName;
    private String flatno;
    private String email;

    // constructor
    public VisitorResidentDTO(Visitor visitor) {
        this.visitorName = visitor.getVisitorName();
        this.visitPurpose = visitor.getVisitPurpose();
        this.timeIn = visitor.getTimeIn();
        this.timeOut = visitor.getTimeOut();
        this.phoneNumber = visitor.getPhoneNumber();
        this.isActiveVisitor = visitor.isActiveVisitor();
        this.visitorType = visitor.getVisitorType().name();

        // map resident details
        if(visitor.getResident() != null) {
            this.residentName = visitor.getResident().getFirstname() + " " + visitor.getResident().getLastname();
            this.flatno = visitor.getResident().getFlatno();
            this.email = visitor.getResident().getEmail();
        }
    }
}
