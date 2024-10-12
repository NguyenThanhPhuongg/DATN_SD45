package org.example.datn.repository;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author hoangKhong
 */
@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, Long> {
}
