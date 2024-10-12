package org.example.datn.repository;

import org.example.datn.entity.KhuyenMai;
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Long> {
}
