package org.example.datn.service;

import org.example.datn.entity.SanPham;
import org.example.datn.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {
    @Autowired
    private SanPhamRepository repo;

    public Optional<SanPham> findById(Long id) {
        return repo.findById(id);
    }

    public List<SanPham> findByIdIn(List<Long> ids) {
        return repo.findByIdIn(ids);
    }

}
