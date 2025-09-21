package com.AutoTrack.dtoClasses;

import java.util.List;

public class HomeSummaryDTO {

    private long totalResidents;
    private List<ResidentDTO> recentResidents;

    private long totalVehicles;
    private long activeVehicles;
    private List<VehicleDTO> recentVehicles;

    private long totalVisitorsToday;
    private long totalVisitorsThisWeek;
    private List<VisitorDTO> recentVisitors;


    public long getTotalResidents() {
        return totalResidents;
    }

    public void setTotalResidents(long totalResidents) {
        this.totalResidents = totalResidents;
    }

    public List<ResidentDTO> getRecentResidents() {
        return recentResidents;
    }

    public void setRecentResidents(List<ResidentDTO> recentResidents) {
        this.recentResidents = recentResidents;
    }

    public long getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(long totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public long getActiveVehicles() {
        return activeVehicles;
    }

    public void setActiveVehicles(long activeVehicles) {
        this.activeVehicles = activeVehicles;
    }

    public List<VehicleDTO> getRecentVehicles() {
        return recentVehicles;
    }

    public void setRecentVehicles(List<VehicleDTO> recentVehicles) {
        this.recentVehicles = recentVehicles;
    }

    public long getTotalVisitorsToday() {
        return totalVisitorsToday;
    }

    public void setTotalVisitorsToday(long totalVisitorsToday) {
        this.totalVisitorsToday = totalVisitorsToday;
    }

    public long getTotalVisitorsThisWeek() {
        return totalVisitorsThisWeek;
    }

    public void setTotalVisitorsThisWeek(long totalVisitorsThisWeek) {
        this.totalVisitorsThisWeek = totalVisitorsThisWeek;
    }

    public List<VisitorDTO> getRecentVisitors() {
        return recentVisitors;
    }

    public void setRecentVisitors(List<VisitorDTO> recentVisitors) {
        this.recentVisitors = recentVisitors;
    }
}
