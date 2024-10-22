package org.example.datn.repository;

import org.example.datn.entity.Blog;
import org.example.datn.entity.KhuyenMai;
import org.example.datn.entity.Nhom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Blob;
import java.util.List;


@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query("SELECT p FROM Blog p WHERE p.id = ?1")
    List<Blog> findByCateId(Long cid);

}
