package org.example.datn.repository;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Thuonghieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhMucRepository extends JpaRepository<DanhMuc, Long> {
    @Query("SELECT p FROM DanhMuc p WHERE p.id = ?1")
    List<DanhMuc> findByCateId(Long cid);
}
