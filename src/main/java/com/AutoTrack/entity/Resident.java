package com.AutoTrack.entity;


import com.AutoTrack.eNum.ResidentType;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity

@ToString
@Setter
@Getter
public class Resident {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String lastname;

    private Long contactno;

    private String flatno;

    private String email;

    // eNum field
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResidentType residentType;





}
