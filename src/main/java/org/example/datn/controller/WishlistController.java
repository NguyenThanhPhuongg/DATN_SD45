package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class WishlistController {

    @GetMapping("/wishlist")
    public String wishlist() {
        return "customer/wishlist/index";
    }
}
