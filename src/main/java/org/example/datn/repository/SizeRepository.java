package org.example.datn.repository;

import org.example.datn.entity.ChiTietGioHang;
import org.example.datn.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
}
