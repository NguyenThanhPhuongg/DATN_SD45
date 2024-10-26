package org.example.datn.controller;

import org.example.datn.entity.DanhMuc;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.DanhMucRequest;
import org.example.datn.processor.DanhMucProcessor;
import org.example.datn.processor.HoaDonProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/hoadon")
public class HoaDonController {

    @Autowired
    private HoaDonProcessor processor;

    // Lấy danh sách tất cả các hóa đơn
    @GetMapping
    public ResponseEntity<ServiceResult> findAll() {
        ServiceResult result = processor.getAll();
        return ResponseEntity.ok(result);
    }

    // Lấy theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        ServiceResult result = processor.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
