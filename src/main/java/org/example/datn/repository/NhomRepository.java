package org.example.datn.repository;

import org.example.datn.entity.Nhom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hoangKhong
 */
@Repository
public interface NhomRepository extends JpaRepository<Nhom, Long> {

    @Query("SELECT n FROM Nhom n WHERE n.id IN (SELECT u.idNhom FROM User u WHERE u.id = :userId)")
    List<Nhom> findNhomByUserId(@Param("userId") Long userId);

}
