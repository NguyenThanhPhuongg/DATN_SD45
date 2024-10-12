package org.example.datn.repository;

import org.example.datn.entity.DiemTichLuy;
import org.example.datn.entity.LichSuHoTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface DiemTichLuyRepository extends JpaRepository<DiemTichLuy, Long> {
}
