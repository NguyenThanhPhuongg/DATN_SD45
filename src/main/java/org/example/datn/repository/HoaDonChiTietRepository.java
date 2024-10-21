package org.example.datn.repository;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {
    @Query("SELECT p FROM HoaDonChiTiet p WHERE p.id = ?1")
    List<HoaDonChiTiet> findByCateId(Long cid);

}
