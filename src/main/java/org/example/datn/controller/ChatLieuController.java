package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.MauSac;
import org.example.datn.model.ServiceResult;
import org.example.datn.processor.ChatLieuProcessor;
import org.example.datn.processor.MauSacProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController("ChatLieuApi")
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatLieuController {
    @Autowired
    ChatLieuProcessor processor;

    @GetMapping("/get-list")
    public ResponseEntity<ServiceResult> getList() {
        return ResponseEntity.ok(processor.getList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<ServiceResult> add(@RequestBody @Valid ChatLieu chatLieu) {
        return ResponseEntity.status(201).body(processor.save(chatLieu));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody @Valid ChatLieu chatLieu) {
        chatLieu.setId(id); // Đặt ID để cập nhật
        return ResponseEntity.ok(processor.save(chatLieu));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }
}
