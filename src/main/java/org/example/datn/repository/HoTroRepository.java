package org.example.datn.repository;

import org.example.datn.entity.HoTro;
import org.example.datn.entity.PhanHoi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface HoTroRepository extends JpaRepository<HoTro, Long> {
}
