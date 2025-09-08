package com.AutoTrack.controller;

import com.AutoTrack.dtoClasses.VisitorResidentDTO;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/visitor")
public class VisitorController {

    @Autowired
    private VisitorService visitorService;


    // API to add visitor data
    @PostMapping("/addVisitor")
    public ResponseEntity<Visitor> addVisitor(@RequestBody Visitor visitor) {
        Visitor savedVisitor = visitorService.addVisitor(visitor);
        return new ResponseEntity<>(savedVisitor, HttpStatus.CREATED);
    }

    // controller to get visitor details by regNum
    @GetMapping("/resident/{regNum}")
    public ResponseEntity<VisitorResidentDTO> getVisitorResidentDetails(@PathVariable String regNum) {
        VisitorResidentDTO details = visitorService.getVisitorResidentDetailsByRegNum(regNum);
        return ResponseEntity.ok(details);
    }

    // API to update out-time
    @PatchMapping("/exit-time/{regNum}")
    public ResponseEntity<VisitorResidentDTO> updateExitTime(
            @PathVariable String regNum,
            @RequestBody Map<String, String> requestBody) {

        LocalDateTime exitTime = LocalDateTime.parse(requestBody.get("timeOut"));
        VisitorResidentDTO updatedVisitor = visitorService.updateVisitorExitTime(regNum, exitTime);

        return ResponseEntity.ok(updatedVisitor);
    }


    // API to filter visitor by their type
    @GetMapping("/filter")
    public ResponseEntity<List<VisitorResidentDTO>> getVisitorsByFilter(
            @RequestParam(required = false) List<String> types) {

        List<VisitorResidentDTO> visitors = visitorService.getVisitorsByFilter(types);
        return ResponseEntity.ok(visitors);
    }

}
