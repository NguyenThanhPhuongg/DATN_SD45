package org.example.datn.repository;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, Long> {
    @Query("SELECT p FROM SanPhamChiTiet p WHERE p.id = ?1")
    List<SanPhamChiTiet> findByCateId(Long cid);
}
