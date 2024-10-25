package org.example.datn.repository;

import org.example.datn.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, Long> {
    List<GioHangChiTiet> findByIdGioHang(Long idGioHang);

    Optional<GioHangChiTiet> findByIdGioHangAndIdSanPhamChiTiet(Long idGioHang, Long idSanPhamChiTiet);
}
