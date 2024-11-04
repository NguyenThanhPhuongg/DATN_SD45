package org.example.datn.service;

import org.example.datn.entity.HoaDon;
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

    public List<HoaDonChiTiet> findByIdHoaDonInAndTrangThai(List<Long> idHoaDons, Integer trangThai){
        return repo.findByIdHoaDonInAndTrangThai(idHoaDons, trangThai);
    }
}
