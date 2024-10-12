package org.example.datn.repository;

import org.example.datn.entity.HinhAnh;
import org.example.datn.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh, Long> {
}
