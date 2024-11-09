package org.example.datn.controller;

import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.processor.SanPhamProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/san-pham1")
public class TestController {

    @Autowired
    SanPhamProcessor processor;

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getAll() {
        return ResponseEntity.ok(processor.getAll());
    }

    @PostMapping
    public ResponseEntity<ServiceResult> add(@RequestParam("file") MultipartFile file, @ModelAttribute SanPhamModel model) {
        return ResponseEntity.ok(processor.save(model, file));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestParam("file") MultipartFile file, @ModelAttribute SanPhamModel model) {
        return ResponseEntity.ok(processor.update(id, model, file));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }
}
