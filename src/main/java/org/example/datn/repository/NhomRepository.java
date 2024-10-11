package org.example.datn.repository;

import org.example.datn.entity.Nhom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface NhomRepository extends JpaRepository<Nhom, Long> {
}
