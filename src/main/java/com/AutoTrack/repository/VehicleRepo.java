package com.AutoTrack.repository;

import com.AutoTrack.entity.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepo extends JpaRepository<Vehicles, Integer> {
    Optional<Vehicles> findByRegNum(String regNum);

    long count(); // total vehicles
    long countByIsVehActive(boolean isVehActive); // active vehicles
    List<Vehicles> findTop5ByOrderByCreatedAtDesc(); // recent vehicles


}
