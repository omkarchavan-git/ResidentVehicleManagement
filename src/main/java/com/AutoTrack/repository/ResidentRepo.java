package com.AutoTrack.repository;

import com.AutoTrack.eNum.ResidentType;
import com.AutoTrack.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResidentRepo extends JpaRepository<Resident, Integer> {

    List<Resident> findByFirstnameIgnoreCase(String firstname);

    List<Resident> findByLastnameIgnoreCase(String lastname);

    List<Resident> findByFirstnameIgnoreCaseAndLastnameIgnoreCase(String firstname, String lastname);

    Resident findByFirstname(String firstname);

    Resident findByFlatno(String flatno);

    Resident findByParkinglot(String parkinglot);

    List<Resident> findByResidentType(ResidentType residentType);

    long count();
    List<Resident> findTop5ByOrderByCreatedAtDesc();


}
