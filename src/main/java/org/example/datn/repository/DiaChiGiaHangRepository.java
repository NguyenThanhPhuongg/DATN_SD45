package org.example.datn.repository;

import org.example.datn.entity.DiaChiGiaHang;
import org.example.datn.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaChiGiaHangRepository extends JpaRepository<DiaChiGiaHang, Long> {
    @Query("SELECT p FROM DiaChiGiaHang p WHERE p.id = ?1")
    List<DiaChiGiaHang> findByCateId(Long cid);
}
