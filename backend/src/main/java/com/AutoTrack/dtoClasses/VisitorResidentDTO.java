package com.AutoTrack.dtoClasses;

import com.AutoTrack.entity.Visitor;
import lombok.Getter;
import lombok.Setter;

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


    public String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }

    public String getVisitPurpose() {
        return visitPurpose;
    }

    public void setVisitPurpose(String visitPurpose) {
        this.visitPurpose = visitPurpose;
    }

    public LocalDateTime getTimeIn() {
        return timeIn;
    }

    public void setTimeIn(LocalDateTime timeIn) {
        this.timeIn = timeIn;
    }

    public LocalDateTime getTimeOut() {
        return timeOut;
    }

    public void setTimeOut(LocalDateTime timeOut) {
        this.timeOut = timeOut;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isActiveVisitor() {
        return isActiveVisitor;
    }

    public void setActiveVisitor(boolean activeVisitor) {
        isActiveVisitor = activeVisitor;
    }

    public String getVisitorType() {
        return visitorType;
    }

    public void setVisitorType(String visitorType) {
        this.visitorType = visitorType;
    }

    public String getResidentName() {
        return residentName;
    }

    public void setResidentName(String residentName) {
        this.residentName = residentName;
    }

    public String getFlatno() {
        return flatno;
    }

    public void setFlatno(String flatno) {
        this.flatno = flatno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
