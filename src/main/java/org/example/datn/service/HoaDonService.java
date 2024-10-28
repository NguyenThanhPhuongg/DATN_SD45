package org.example.datn.service;

import org.example.datn.entity.HoaDon;
import org.example.datn.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonService {

    @Autowired
    private HoaDonRepository repo;

    public List<HoaDon> getAll(){
        return repo.findAll();
    }
    public void save(HoaDon hoaDon) {
        repo.save(hoaDon);
    }

    public Optional<HoaDon> findById(Long id) {
        return repo.findById(id);
    }

    public void delete(HoaDon hoaDon) {
        repo.delete(hoaDon);
    }

    public HoaDon findTopByOrderByNgayTaoDesc(){
        return repo.findTopByOrderByNgayTaoDesc();
    }
}
