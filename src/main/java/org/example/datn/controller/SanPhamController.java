package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.entity.SanPham;
import org.example.datn.model.ServiceResult;
import org.example.datn.processor.SanPhamProcessor;
import org.example.datn.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("SanPhamApi")
@RequestMapping("/san-pham")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamController {

    @Autowired
    SanPhamProcessor processor;
    @Autowired
    SanPhamRepository sanPhamRepository;

    //    Lấy sản phẩm chi tiết theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    // GET all list SanPham
    @GetMapping("/get-list")
    public List<SanPham> getAll() {
        return sanPhamRepository.findAll();
    }
}
