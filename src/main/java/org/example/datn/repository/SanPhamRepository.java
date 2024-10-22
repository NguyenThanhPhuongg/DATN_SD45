package org.example.datn.repository;

<<<<<<< HEAD
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
=======
import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    @Query("SELECT p FROM SanPham p WHERE p.id = ?1")
    List<SanPham> findByCateId(Long cid);
>>>>>>> ed8b9726fd62aaec701e33c3fcf229779dfeab88
}
