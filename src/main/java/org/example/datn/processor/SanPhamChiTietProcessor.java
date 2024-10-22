package org.example.datn.processor;

import org.example.datn.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SanPhamChiTietProcessor {
    @Autowired
    private SanPhamChiTietService service;

}
