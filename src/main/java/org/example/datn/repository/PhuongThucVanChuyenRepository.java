package org.example.datn.repository;

import org.example.datn.entity.PhuongThucVanChuyen;
import org.example.datn.entity.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface PhuongThucVanChuyenRepository extends JpaRepository<PhuongThucVanChuyen, Long> {
}