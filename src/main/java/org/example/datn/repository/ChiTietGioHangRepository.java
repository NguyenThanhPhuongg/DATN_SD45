package org.example.datn.repository;

import org.example.datn.entity.ChiTietGioHang;
import org.example.datn.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, Long> {
}
