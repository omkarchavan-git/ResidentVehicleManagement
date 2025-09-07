package com.AutoTrack.entity;

import com.AutoTrack.eNum.VisitorType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Duration;
import java.time.LocalDateTime;


@Entity

public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Visitor name is mandatory")
    private String visitorName;

    @NotBlank(message = "Vehicle name is mandatory")
    private String vehicleName;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Vehicle registration number is mandatory")
    private String vehicalRegisterationNum;

    private String visitPurpose;

    private LocalDateTime timeIn;

    private LocalDateTime timeOut;

    @NotNull(message = "Phone number is mandatory")
    private Long phoneNumber;

    private boolean isActiveVisitor = true;

    @Column(name = "visit_duration")
    private String visitDuration;   // HH:MM format

    @PreUpdate                            // to auto calculate & update duration hours
    public void calculateDuration() {
        if (timeIn != null && timeOut != null) {
            Duration duration = Duration.between(timeIn, timeOut);
            long hours = duration.toHours();
            long minutes = duration.toMinutes() % 60;
            this.visitDuration = String.format("%02d:%02d", hours, minutes);
        }
    }



    @Enumerated(EnumType.STRING)
    private VisitorType visitorType;

    //  Many-to-One mapping with Resident
    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "Visitor name is mandatory") String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName(@NotBlank(message = "Visitor name is mandatory") String visitorName) {
        this.visitorName = visitorName;
    }

    public @NotBlank(message = "Vehicle name is mandatory") String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(@NotBlank(message = "Vehicle name is mandatory") String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public @NotBlank(message = "Vehicle registration number is mandatory") String getVehicalRegisterationNum() {
        return vehicalRegisterationNum;
    }

    public void setVehicalRegisterationNum(@NotBlank(message = "Vehicle registration number is mandatory") String vehicalRegisterationNum) {
        this.vehicalRegisterationNum = vehicalRegisterationNum;
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

    public @NotNull(message = "Phone number is mandatory") Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(@NotNull(message = "Phone number is mandatory") Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isActiveVisitor() {
        return isActiveVisitor;
    }

    public void setActiveVisitor(boolean activeVisitor) {
        isActiveVisitor = activeVisitor;
    }

    public VisitorType getVisitorType() {
        return visitorType;
    }

    public void setVisitorType(VisitorType visitorType) {
        this.visitorType = visitorType;
    }

    public Resident getResident() {
        return resident;
    }

    public void setResident(Resident resident) {
        this.resident = resident;
    }

    public String getVisitDuration() {
        return visitDuration;
    }

    public void setVisitDuration(String visitDuration) {
        this.visitDuration = visitDuration;
    }
}
