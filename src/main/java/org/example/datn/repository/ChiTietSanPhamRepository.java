package org.example.datn.repository;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.service.ChiTietSanPhamService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<SanPhamChiTiet, Long> {
}
