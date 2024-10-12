package org.example.datn.repository;

import org.example.datn.entity.HoTro;
import org.example.datn.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
}
