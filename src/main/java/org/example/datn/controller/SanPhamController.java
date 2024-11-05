package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.processor.SanPhamProcessor;
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

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @GetMapping()
    public ResponseEntity<ServiceResult> getAll() {
        return ResponseEntity.ok(processor.getAll());
    }

    @PostMapping
    public ResponseEntity<ServiceResult> add(@RequestBody SanPhamModel model) {
        return ResponseEntity.ok(processor.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody SanPhamModel model) {
        return ResponseEntity.ok(processor.update(id, model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }
  //  @GetMapping ("/productDetail")


}
