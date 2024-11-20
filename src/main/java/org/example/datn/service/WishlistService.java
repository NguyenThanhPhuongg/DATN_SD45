package org.example.datn.service;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.Wishlist;
import org.example.datn.model.UserAuthentication;
import org.example.datn.repository.SanPhamRepository;
import org.example.datn.repository.UserRepository;
import org.example.datn.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private SanPhamRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public List<SanPham> getFavoriteProductsByUserId(UserAuthentication ua) {
        List<Long> favoriteProductIds = wishlistRepository.findProductIdsByUserId(ua.getPrincipal());
        return productRepository.findAllById(favoriteProductIds);
    }

    public List<Wishlist> getAll() {
        return wishlistRepository.findAll();
    }

    @Transactional
    public boolean removeProductFromWishlist(Long productId, UserAuthentication ua) {
        // Tìm sản phẩm yêu thích theo ID và userId
        Optional<Wishlist> wishlist = wishlistRepository.findByIdAndUserId(productId, ua.getPrincipal());

        // Nếu sản phẩm tồn tại, xóa nó
        if (wishlist.isPresent()) {
            wishlistRepository.deleteById(wishlist.get().getId());
            return true;
        }

        // Nếu không tìm thấy sản phẩm yêu thích, trả về false
        return false;
    }
}
