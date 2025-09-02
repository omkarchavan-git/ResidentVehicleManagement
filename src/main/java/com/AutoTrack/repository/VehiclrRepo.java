package com.AutoTrack.repository;

import com.AutoTrack.entity.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiclrRepo extends JpaRepository<Vehicles, Integer> {
}
