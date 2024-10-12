package org.example.datn.repository;

import org.example.datn.entity.ChucNang;
import org.example.datn.entity.DiaChiGiaoHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface DiaChiGiaoHangRepository extends JpaRepository<DiaChiGiaoHang, Long> {
}
