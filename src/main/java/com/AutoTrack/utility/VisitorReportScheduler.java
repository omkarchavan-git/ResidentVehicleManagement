package com.AutoTrack.utility;

import com.AutoTrack.entity.Visitor;
import com.AutoTrack.repository.VisitorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VisitorReportScheduler {

    @Autowired
    private VisitorRepo visitorRepo;

    @Scheduled(cron = "0 0 23 * * ?") // every day at 11 PM
    public void generateDailyVisitorReport() {
        List<Visitor> visitors = visitorRepo.findAll();

        try {
            ExcelGenerator.generateVisitorReport(visitors);
            System.out.println("Visitor report generated successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
