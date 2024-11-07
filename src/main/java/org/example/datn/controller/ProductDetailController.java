package org.example.datn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductDetailController {
    @GetMapping("/productDetail")
    // Method to return the view for product details
    public String getProduct(){
        return "customer/ProductDetail/index";
    }
}
