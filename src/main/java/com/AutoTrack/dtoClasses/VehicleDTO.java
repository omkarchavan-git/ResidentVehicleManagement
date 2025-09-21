package com.AutoTrack.dtoClasses;

public class VehicleDTO {

    private Long id;
    private String regNum;

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
}
