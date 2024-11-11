package org.example.datn.controller;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Size;
import org.example.datn.entity.YeuCauDoiTra;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.DanhMucRequest;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.model.response.YeuCauDoiTraModel;
import org.example.datn.processor.SanPhamProcessor;
import org.example.datn.processor.YeuCauDoiTraProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/yeu-cau")
public class YeuCauDoiTraController {

    @Autowired
    YeuCauDoiTraProcessor processor;

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getAll() {
        return ResponseEntity.ok(processor.getAll());
    }

    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody YeuCauDoiTra request) {
        ServiceResult result = processor.save(request);
        return new ResponseEntity<>(result, HttpStatus.CREATED); // Thay đổi từ HttpStatus.OK sang HttpStatus.CREATED
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody YeuCauDoiTra request) {
        ServiceResult result = processor.update(id, request);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }
}
