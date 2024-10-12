package org.example.datn.repository;

import org.example.datn.entity.DanhGiaSanPham;
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGiaSanPham, Long> {
}
