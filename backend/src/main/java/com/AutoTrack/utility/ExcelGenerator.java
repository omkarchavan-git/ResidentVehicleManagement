package com.AutoTrack.utility;

import com.AutoTrack.entity.Visitor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public class ExcelGenerator {

    public static void generateVisitorReport(List<Visitor> visitors) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Visitors Report");

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Visitor Name", "Vehicle Reg Num", "Visit Purpose", "Time In", "Time Out", "Phone Number", "Active Visitor"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Fill rows with visitor data
        int rowCount = 1;
        for (Visitor visitor : visitors) {
            Row row = sheet.createRow(rowCount++);
            row.createCell(0).setCellValue(visitor.getVisitorName());
            row.createCell(1).setCellValue(visitor.getVehicalRegisterationNum());
            row.createCell(2).setCellValue(visitor.getVisitPurpose());
            row.createCell(3).setCellValue(visitor.getTimeIn() != null ? visitor.getTimeIn().toString() : "");
            row.createCell(4).setCellValue(visitor.getTimeOut() != null ? visitor.getTimeOut().toString() : "");
            row.createCell(5).setCellValue(visitor.getPhoneNumber() != null ? visitor.getPhoneNumber().toString() : "");
            row.createCell(6).setCellValue(visitor.isActiveVisitor());
        }

        // Save Excel file to local drive (D:/reports/)
        File directory = new File("D:/reports/");
        if (!directory.exists()) {
            directory.mkdirs();
        }
        FileOutputStream outputStream = new FileOutputStream("D:/reports/visitor_report_" + LocalDate.now() + ".xlsx");
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
