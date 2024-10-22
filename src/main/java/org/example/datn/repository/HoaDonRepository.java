package org.example.datn.repository;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
    @Query("SELECT p FROM HoaDon p WHERE p.id = ?1")
    List<HoaDon> findByCateId(Long cid);
}
