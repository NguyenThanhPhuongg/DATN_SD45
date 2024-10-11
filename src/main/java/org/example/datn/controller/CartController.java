package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class CartController {

    @GetMapping("/login")
    public String login(){
        return "customer/login/index";
    }

    @GetMapping("/cart")
    public String cart() {
        return "customer/cart/index";
    }



}
