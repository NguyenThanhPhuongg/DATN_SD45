package org.example.datn.controller;

import lombok.RequiredArgsConstructor;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.Wishlist;
import org.example.datn.model.UserAuthentication;
import org.example.datn.repository.WishlistRepository;
import org.example.datn.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavoriteById(@PathVariable Long id, UserAuthentication ua) {
        boolean result = wishlistService.removeProductFromWishlist(id, ua);
        if (result) {
            return ResponseEntity.noContent().build();  // Trả về 204 No Content nếu xóa thành công
        } else {
            return ResponseEntity.notFound().build();  // Trả về 404 Not Found nếu không tìm thấy sản phẩm
        }
    }

//ADD

}
