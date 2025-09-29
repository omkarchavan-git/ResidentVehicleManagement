package com.AutoTrack.dtoClasses;

import com.AutoTrack.eNum.VehicleType;

public class VehicleDTO {


    private Long id;
    private String regNum;
    private String vehName;
    private String color;
    private VehicleType vehicleType;
    private boolean vehActive;
    private String residentName; // NEW


    // Constructor
    public VehicleDTO(Long id, String regNum, String vehName, String color,
                      VehicleType vehicleType, boolean vehActive, String residentName) {
        this.id = id;
        this.regNum = regNum;
        this.vehName = vehName;
        this.color = color;
        this.vehicleType = vehicleType;
        this.vehActive = vehActive;
        this.residentName = residentName;
    }

    public VehicleDTO(Long id, String regNum) {
        this.id = id;
        this.regNum = regNum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegNum() {
        return regNum;
    }

    public void setRegNum(String regNum) {
        this.regNum = regNum;
    }

    public String getVehName() {
        return vehName;
    }

    public void setVehName(String vehName) {
        this.vehName = vehName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public boolean isVehActive() {
        return vehActive;
    }

    public void setVehActive(boolean vehActive) {
        this.vehActive = vehActive;
    }

    public String getResidentName() {
        return residentName;
    }

    public void setResidentName(String residentName) {
        this.residentName = residentName;
    }
}
