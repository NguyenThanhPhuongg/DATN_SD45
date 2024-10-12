package org.example.datn.repository;

import org.example.datn.entity.ApDungKhuyenMai;
import org.example.datn.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface ApDungKhuyenMaiRepository extends JpaRepository<ApDungKhuyenMai, Long> {
}
