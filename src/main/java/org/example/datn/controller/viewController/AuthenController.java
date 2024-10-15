package org.example.datn.controller.viewController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/v1/auth")
public class AuthenController {
    @GetMapping("/register")
    public String register() {
        return "customer/auth/register";
    }

    @GetMapping("/login")
    public String login() {
        return "customer/auth/login";
    }
}
