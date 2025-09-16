package com.AutoTrack.entity;

import com.AutoTrack.eNum.ResidentType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@ToString

public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @NotBlank(message = "First name cannot be blank")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Invalid first name, only alphabets are allowed")
    private String firstname;

    @Pattern(regexp = "^[A-Za-z]+$", message = "Invalid lastname, only alphabets are allowed")
    @NotBlank(message = "Lastname is mandatory")
    private String lastname;

    @NotNull(message = "Contact is mandatory")
    @Pattern(regexp = "^[0-9]{10}+$", message = "Invalid Contact, must be 10 digit")
    private Long contactno;

    @NotBlank(message = "flatno is mandatory")
    private String flatno;

    @Email(message = "Lastname is mandatory")
    private String email;

    // eNum field

    @Enumerated(EnumType.STRING)
    private ResidentType residentType;


    // mapping with vehicle
    @OneToMany(mappedBy = "resident", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Vehicles> vehicles = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {

            this.firstname = firstname.trim();
        }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname.trim();
    }

    public Long getContactno() {
        return contactno;
    }

    public void setContactno(Long contactno) {
        this.contactno = contactno;
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

    public ResidentType getResidentType() {
        return residentType;
    }

    public void setResidentType(ResidentType residentType) {
        this.residentType = residentType;
    }

    public List<Vehicles> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<Vehicles> vehicles) {
        this.vehicles = vehicles;
    }

}
