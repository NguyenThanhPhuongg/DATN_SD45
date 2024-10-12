package org.example.datn.repository;

import org.example.datn.entity.ChiTietDoiTra;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.YeuCauDoiTra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface YeuCauDoiTraChiTietRepository extends JpaRepository<ChiTietDoiTra, Long> {
}
