package com.AutoTrack.dtoClasses;

public class VisitorDTO {

    private Long id;
    private String visitorName;

    public VisitorDTO(Long id, String visitorName) {
        this.id = id;
        this.visitorName = visitorName;
    }


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

}
