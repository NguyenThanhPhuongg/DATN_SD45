package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.DiaChiGiaoHangRequest;
import org.example.datn.processor.DiaChiGiaoHangProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController("DiaChiGiaoHangApi")
@RequestMapping("/dia-chi")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DiaChiGiaoHangController {
    @Autowired
    DiaChiGiaoHangProcessor processor;

    @GetMapping("/get-list")
    public ResponseEntity<ServiceResult> getList(UserAuthentication ua) {
        return ResponseEntity.ok(processor.findByIdNguoiDung(ua));
    }

    @GetMapping("/get-active")
    public ResponseEntity<ServiceResult> getActive(UserAuthentication ua) {
        return ResponseEntity.ok(processor.getActive(ua));
    }


    @PostMapping("/insert")
    public ResponseEntity<ServiceResult> insert(@RequestBody DiaChiGiaoHangRequest request, UserAuthentication ua) {
        return ResponseEntity.ok(processor.insert(request,ua));
    }



}
