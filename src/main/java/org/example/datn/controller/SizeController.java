package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.entity.Size;
import org.example.datn.model.ServiceResult;
import org.example.datn.processor.SizeProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController("SizeApi")
@RequestMapping("/size")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SizeController {
    @Autowired
    SizeProcessor processor;

    @GetMapping("/get-list")
    public ResponseEntity<ServiceResult> getList() {
        return ResponseEntity.ok(processor.getList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<ServiceResult> add(@RequestBody @Valid Size size) {
        return ResponseEntity.status(201).body(processor.save(size));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody @Valid Size size) {
        size.setId(id); // Đặt ID để cập nhật
        return ResponseEntity.ok(processor.save(size));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }
}
