package org.example.datn.repository;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
    @Query("SELECT p FROM HoaDon p WHERE p.id = ?1")
    List<HoaDon> findByCateId(Long cid);

    HoaDon findTopByOrderByNgayTaoDesc();

    List<HoaDon> findByIdNguoiDung(Long idNguoiDung);

    Optional<HoaDon> findByMa(String ma);
}
