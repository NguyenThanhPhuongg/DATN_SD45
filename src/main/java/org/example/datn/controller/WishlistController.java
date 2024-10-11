package org.example.datn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class WishlistController {


    @GetMapping("/wishlist")
    public String index() {
        return "/customer/pages/wishlist";
    }
}
