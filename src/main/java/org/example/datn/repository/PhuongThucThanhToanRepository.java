package org.example.datn.repository;

import org.example.datn.entity.DiemTichLuy;
import org.example.datn.entity.PhuongThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface PhuongThucThanhToanRepository extends JpaRepository<PhuongThucThanhToan, Long> {
}
