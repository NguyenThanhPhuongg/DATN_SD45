package org.example.datn.repository;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Long> {
    @Query("SELECT p FROM KhuyenMai p WHERE p.id = ?1")
    List<KhuyenMai> findByCateId(Long cid);
}
