package org.example.datn.repository;

import org.example.datn.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    @Query("SELECT w.productId FROM Wishlist w WHERE w.userId = :userId")
    List<Long> findProductIdsByUserId(@Param("userId") Long userId);
}