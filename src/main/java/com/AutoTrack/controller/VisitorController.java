package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Visitor;
import com.AutoTrack.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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

}
