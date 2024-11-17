package org.example.datn.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.Wishlist;
import org.example.datn.repository.WishlistRepository;
import org.example.datn.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public List<SanPham> getUserFavoriteProducts(@PathVariable Long userId) {
        return wishlistService.getFavoriteProductsByUserId(userId);
    }

    @GetMapping("/hien-thi")
    public List<Wishlist> getAll() {
        return wishlistService.getAll();
    }

}
