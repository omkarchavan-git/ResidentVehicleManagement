package com.AutoTrack.repository;

import com.AutoTrack.entity.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRepo extends JpaRepository<Vehicles, Integer> {
    Optional<Vehicles> findByRegNum(String regNum);
}
