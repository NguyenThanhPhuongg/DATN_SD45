package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.GioHangChiTietRequest;
import org.example.datn.processor.GioHangChiTietProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/gio-hang-chi-tiet")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GioHangChiTietController {

    @Autowired
    GioHangChiTietProcessor processor;

    @PostMapping()
    public ResponseEntity<ServiceResult> addGioHangChiTiet(@RequestBody GioHangChiTietRequest request, UserAuthentication ua) {
        return ResponseEntity.ok(processor.save(request, ua));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> updateGioHangChiTiet(@PathVariable Long id, @RequestBody GioHangChiTietRequest request, UserAuthentication ua) {
        return ResponseEntity.ok(processor.update(id, request, ua));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> deleteGioHangChiTiet(@PathVariable Long id, UserAuthentication ua) {
        return ResponseEntity.ok(processor.delete(id, ua));
    }

    @GetMapping("/")
    public ResponseEntity<ServiceResult> getGioHangChiTiet(UserAuthentication ua) {
        return ResponseEntity.ok(processor.getList(ua));
    }

}
