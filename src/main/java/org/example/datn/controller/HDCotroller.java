package org.example.datn.controller;

import org.example.datn.entity.HoaDon;
import org.example.datn.model.request.HDRequest;
import org.example.datn.service.HDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hoa-don")
public class HDCotroller {
    @Autowired
    private HDService hdService;

    @PostMapping("/thanh-toan")
    public ResponseEntity<HoaDon> thanhToan(@RequestBody HDRequest hdRequest) {
        HoaDon hoaDon = hdService.taoHoaDon(hdRequest);
        return ResponseEntity.ok(hoaDon);
    }
}
