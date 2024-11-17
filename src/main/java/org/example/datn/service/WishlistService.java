package org.example.datn.service;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.Wishlist;
import org.example.datn.repository.SanPhamRepository;
import org.example.datn.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private SanPhamRepository productRepository;

    public List<SanPham> getFavoriteProductsByUserId(Long userId) {
        List<Long> favoriteProductIds = wishlistRepository.findProductIdsByUserId(userId);
        return productRepository.findAllById(favoriteProductIds);
    }
    public List<Wishlist> getAll () {
        return wishlistRepository.findAll();
    }
}
