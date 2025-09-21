package com.AutoTrack.Service;

import com.AutoTrack.dtoClasses.HomeSummaryDTO;
import com.AutoTrack.dtoClasses.ResidentDTO;
import com.AutoTrack.dtoClasses.VehicleDTO;
import com.AutoTrack.dtoClasses.VisitorDTO;
import com.AutoTrack.repository.ResidentRepo;
import com.AutoTrack.repository.VehicleRepo;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.DayOfWeek;


import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.stream.Collectors;

@Service
public class HomeService {

    @Autowired
    private ResidentRepo residentRepo;
    @Autowired
    private VehicleRepo vehicleRepo;
    @Autowired
    private VisitorRepo visitorRepo;

    public HomeSummaryDTO getHomeSummary() {
        HomeSummaryDTO summary = new HomeSummaryDTO();

        // Residents
        summary.setTotalResidents(residentRepo.count());
        summary.setRecentResidents(residentRepo.findTop5ByOrderByCreatedAtDesc()
                .stream().map(r -> new ResidentDTO(r.getId(), r.getFirstname(), r.getLastname()))
                .collect(Collectors.toList()));

        /// Vehicles
        summary.setTotalVehicles(vehicleRepo.count());
        summary.setActiveVehicles(vehicleRepo.countByIsVehActive(true)); //  use boolean
        summary.setRecentVehicles(vehicleRepo.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(v -> new VehicleDTO(v.getId(), v.getRegNum()))
                .collect(Collectors.toList()));


        // Visitors
        summary.setTotalVisitorsToday(visitorRepo.countByCreatedAtBetween(
                LocalDateTime.now().with(LocalTime.MIN),
                LocalDateTime.now().with(LocalTime.MAX)
        ));
        summary.setRecentVisitors(visitorRepo.findTop5ByOrderByCreatedAtDesc()
                .stream().map(v -> new VisitorDTO(v.getId(), v.getVisitorName()))
                .collect(Collectors.toList()));

        return summary;
    }
}
