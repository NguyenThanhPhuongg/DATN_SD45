package org.example.datn.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class test {
    @GetMapping("/test")
    public String home(){
        return "staff/index";
    }
}