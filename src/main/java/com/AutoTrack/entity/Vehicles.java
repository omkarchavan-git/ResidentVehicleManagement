package com.AutoTrack.entity;

import com.AutoTrack.eNum.VehicleType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity

public class Vehicles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;

    @NotBlank(message = "Vehicle registration number is mandatory")
    @Column(nullable = false, unique = true)
    @Pattern(regexp = "^[A-Za-z0-9 ]+$", message = "only characters and numbers are valid")
    private String regNum;

    @NotBlank(message = "Vehicle name is mandatory")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Enter valid Vehicle Name")
    private String vehName;

    @NotBlank(message = "Vehicle color is mandatory")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Enter valid color")
    private String color;



    //eNum Filed
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime intime;

    private LocalDateTime  outtime;

    @Column(nullable = false)
    private boolean isVehActive;


    // Mapping with resident
    @ManyToOne
    @JoinColumn(name = "resident_id")
    @JsonBackReference
    private Resident resident;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRegNum() {
        return regNum;
    }

    public void setRegNum(String regNum) {
        this.regNum = regNum;
    }

    public boolean isVehActive() {
        return isVehActive;
    }

    public void setVehActive(boolean vehActive) {
        isVehActive = vehActive;
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

    public LocalDateTime getIntime() {
        return intime;
    }

    public void setIntime(LocalDateTime intime) {
        this.intime = intime;
    }

    public LocalDateTime getOuttime() {
        return outtime;
    }

    public void setOuttime(LocalDateTime outtime) {
        this.outtime = outtime;
    }

    public boolean isVehicle_active() {
        return isVehActive;
    }

    public void setVehicle_active(boolean vehicle_active) {
        isVehActive = vehicle_active;
    }

    public Resident getResident() {
        return resident;
    }

    public void setResident(Resident resident) {
        this.resident = resident;
    }
}

