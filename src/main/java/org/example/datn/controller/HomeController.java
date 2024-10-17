package org.example.datn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class HomeController {
    @GetMapping("/")
    public String home() {
        return "customer/home/index";
    }

    @GetMapping("/category")
    public String category() {
        return "customer/category/category";
    }
}
