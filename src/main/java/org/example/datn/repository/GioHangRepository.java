package org.example.datn.repository;

import org.example.datn.entity.GioHang;
import org.example.datn.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Long> {
}
