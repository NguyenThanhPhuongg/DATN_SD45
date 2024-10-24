package org.example.datn.service;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Thuonghieu;
import org.example.datn.repository.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DanhMucService {

    @Autowired
    DanhMucRepository repo;

    public Optional<DanhMuc> findById(Long id) {
        return repo.findById(id);
    }
}
