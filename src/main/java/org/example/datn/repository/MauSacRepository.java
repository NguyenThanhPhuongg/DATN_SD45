package org.example.datn.repository;

import org.example.datn.entity.MauSac;
import org.example.datn.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Long> {
}
