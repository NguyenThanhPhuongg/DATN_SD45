package org.example.datn.service;

import org.example.datn.entity.Blog;
import org.example.datn.entity.DanhMuc;

import java.util.List;

public interface BlogService {

    List<Blog> findAll();
    Blog findById(Long id);

    List<Blog> findByCateId(Long cid);

    Blog create(Blog product);

    Blog update(Blog product);

    void delete(Long id);
}
