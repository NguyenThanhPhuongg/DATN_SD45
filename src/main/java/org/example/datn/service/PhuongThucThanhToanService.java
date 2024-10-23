package org.example.datn.service;

import org.example.datn.entity.PhuongThucThanhToan;
import org.example.datn.repository.PhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PhuongThucThanhToanService {
    @Autowired
    PhuongThucThanhToanRepository repo;

    public Optional<PhuongThucThanhToan> findById(Long id) {
        return repo.findById(id);
    }
}
