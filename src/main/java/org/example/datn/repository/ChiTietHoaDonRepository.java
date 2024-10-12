package org.example.datn.repository;

import org.example.datn.entity.ChiTietHoaDon;
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Long> {
}
