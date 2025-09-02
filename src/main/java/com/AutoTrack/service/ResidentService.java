package com.AutoTrack.service;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.repository.ResidentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component

public class ResidentService {

    @Autowired
    private ResidentRepo residentRepo;

    // to save Resident data
    public Resident saveResident(Resident resident) {
        return residentRepo.save(resident);

    }

}
