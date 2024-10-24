package org.example.datn.service;

import org.example.datn.entity.Thuonghieu;
import org.example.datn.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThuongHieuService {

    @Autowired
    private ThuongHieuRepository repo;

    public Optional<Thuonghieu> findById(Long id) {
        return repo.findById(id);
    }
}
