package org.example.datn.controller;

import org.example.datn.entity.SanPham;
import org.example.datn.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller

public class HomeController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("/")
    public String home(Model model, @RequestParam(defaultValue = "0") int page) {
        try {
            int pageSize = 5; // Số sản phẩm mỗi trang là 5
            Pageable pageable = PageRequest.of(page, pageSize);
            Page<SanPham> sanPhams = this.sanPhamService.getAllProducts(pageable);
            model.addAttribute("data", sanPhams);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "customer/home/index";
    }

    @GetMapping("/category")
    public String category() {
        return "customer/category/category";
    }
}
