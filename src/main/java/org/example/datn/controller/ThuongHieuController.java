package org.example.datn.controller;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Thuonghieu;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.DanhMucRequest;
import org.example.datn.model.request.ThuongHieuRequest;
import org.example.datn.processor.DanhMucProcessor;
import org.example.datn.processor.ThuongHieuProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/thuonghieu")
public class ThuongHieuController {

    @Autowired
    private ThuongHieuProcessor processor;

    // Lấy danh sách tất cả các danh mục
    @GetMapping
    public ResponseEntity<ServiceResult> findAll() {
        ServiceResult result = processor.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Lấy danh mục theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        ServiceResult result = processor.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Tạo mới danh mục
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody Thuonghieu request) {
        ServiceResult result = processor.save(request);
        return new ResponseEntity<>(result, HttpStatus.CREATED); // Thay đổi từ HttpStatus.OK sang HttpStatus.CREATED
    }


    // Cập nhật danh mục theo ID
    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody ThuongHieuRequest request) {
        ServiceResult result = processor.update(id, request);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Xóa danh mục theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        ServiceResult result = processor.delete(id);
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
