package com.AutoTrack.dtoClasses;

import com.AutoTrack.eNum.VisitorType;

public class VisitorDTO {

    private Long id;
    private String visitorName;
    private String vehicleName;
    private String vehicalRegisterationNum;
    private String visitPurpose;
    private String timeIn;          // as String for JSON
    private String timeOut;         // as String for JSON
    private String visitDuration;
    private VisitorType visitorType;
    private Long phoneNumber;
    private String residentName;    // fetch from Resident

    public VisitorDTO() {}

    public VisitorDTO(long id, String visitorName) {
    }


    // getters & setters
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getVehicalRegisterationNum() {
        return vehicalRegisterationNum;
    }

    public void setVehicalRegisterationNum(String vehicalRegisterationNum) {
        this.vehicalRegisterationNum = vehicalRegisterationNum;
    }

    public String getVisitPurpose() {
        return visitPurpose;
    }

    public void setVisitPurpose(String visitPurpose) {
        this.visitPurpose = visitPurpose;
    }

    public String getTimeIn() {
        return timeIn;
    }

    public void setTimeIn(String timeIn) {
        this.timeIn = timeIn;
    }

    public String getTimeOut() {
        return timeOut;
    }

    public void setTimeOut(String timeOut) {
        this.timeOut = timeOut;
    }

    public String getVisitDuration() {
        return visitDuration;
    }

    public void setVisitDuration(String visitDuration) {
        this.visitDuration = visitDuration;
    }

    public VisitorType getVisitorType() {
        return visitorType;
    }

    public void setVisitorType(VisitorType visitorType) {
        this.visitorType = visitorType;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getResidentName() {
        return residentName;
    }

    public void setResidentName(String residentName) {
        this.residentName = residentName;
    }
}
