package com.AutoTrack.repository;

import com.AutoTrack.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisitorRepo extends JpaRepository<Visitor, Integer> {
        Optional<Visitor> findByVehicalRegisterationNumber(String regNum);
}
