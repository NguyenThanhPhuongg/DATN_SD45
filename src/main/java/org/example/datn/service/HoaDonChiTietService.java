package org.example.datn.service;

import org.example.datn.entity.HoaDonChiTiet;
import org.example.datn.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository repo;

    public void save(HoaDonChiTiet hoaDonChiTiet){
        repo.save(hoaDonChiTiet);
    }

    public Optional<HoaDonChiTiet> findById(Long id){
        return repo.findById(id);
    }

    public void delete(HoaDonChiTiet hoaDonChiTiet){
        repo.delete(hoaDonChiTiet);
    }

//    List<HoaDonChiTiet> findAll();
//    HoaDonChiTiet findById(Long id);
//
//    List<HoaDonChiTiet> findByCateId(Long cid);
//
//    HoaDonChiTiet create(HoaDonChiTiet product);
//
//    HoaDonChiTiet update(HoaDonChiTiet product);
//
//    void delete(Long id);
}
