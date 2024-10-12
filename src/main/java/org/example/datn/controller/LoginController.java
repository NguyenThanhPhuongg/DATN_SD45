package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor

public class LoginController {
    @GetMapping("/login1")
    public String login(){
        return "customer/login/index";
    }
}
