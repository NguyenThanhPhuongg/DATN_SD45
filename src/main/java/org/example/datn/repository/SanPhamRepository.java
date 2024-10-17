package org.example.datn.repository;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    @Query("SELECT p FROM SanPham p WHERE p.id = ?1")
    List<SanPham> findByCateId(Long cid);
}
