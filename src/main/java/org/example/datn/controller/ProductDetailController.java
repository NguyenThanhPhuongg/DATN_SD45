package org.example.datn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductDetailController {
    @GetMapping("/productDetail")
    public String productDetail() {
        return "customer/productDetail/index";
    }
}
