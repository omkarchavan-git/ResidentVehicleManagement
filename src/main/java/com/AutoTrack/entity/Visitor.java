package com.AutoTrack.entity;

import com.AutoTrack.eNum.VisitorType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Duration;
import java.time.LocalDateTime;

@Entity

public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Visitor name is mandatory")
    @Pattern(regexp= "^[A-Za-z]+$", message = "Enter valid first name")
    private String visitorName;

    @NotBlank(message = "Vehicle name is mandatory")
    @Pattern(regexp= "^[A-Za-z]+$", message = "Enter valid last name")
    private String vehicleName;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Vehicle registration number is mandatory")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Enter valid regNum")
    private String vehicalRegisterationNum;


    @Pattern(regexp = "^[A-Za-z ]+$", message = "only alphabets are allowed")
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
    @JsonBackReference
    private Resident resident;

    @CreationTimestamp
    private LocalDateTime createdAt;


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public  String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName (String visitorName) {
        this.visitorName = visitorName;
    }

    public  String getVehicleName() {
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
