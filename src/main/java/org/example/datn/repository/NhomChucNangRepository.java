package org.example.datn.repository;

import org.example.datn.entity.NhomChucNang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface NhomChucNangRepository extends JpaRepository<NhomChucNang, Long> {
}
