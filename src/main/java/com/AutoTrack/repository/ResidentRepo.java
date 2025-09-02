package com.AutoTrack.repository;

import com.AutoTrack.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidentRepo extends JpaRepository<Resident, Integer> {
}
