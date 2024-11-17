package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.Wishlist;
import org.example.datn.model.UserAuthentication;
import org.example.datn.repository.WishlistRepository;
import org.example.datn.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/yeu-thich")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping()
    public List<SanPham> getUserFavoriteProducts(UserAuthentication ua) {
        return wishlistService.getFavoriteProductsByUserId(ua);
    }

//    @GetMapping("/hien-thi")
//    public List<Wishlist> getAll() {
//        return wishlistService.getAll();
//    }

}
