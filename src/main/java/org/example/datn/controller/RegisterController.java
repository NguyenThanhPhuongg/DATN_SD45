package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor

public class RegisterController {
    @GetMapping("/register")
    public String register() {
        return "customer/register/index";
    }
}
