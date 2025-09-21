package com.AutoTrack.repository;

import com.AutoTrack.eNum.VisitorType;
import com.AutoTrack.entity.Visitor;
import jakarta.validation.constraints.Null;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VisitorRepo extends JpaRepository<Visitor, Integer> {

    Optional<Visitor> findByVehicalRegisterationNum(String vehicalRegisterationNum);

    List<Visitor> findByVisitorTypeIn(List<VisitorType> visitorTypes);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Visitor> findTop5ByOrderByCreatedAtDesc();

}
