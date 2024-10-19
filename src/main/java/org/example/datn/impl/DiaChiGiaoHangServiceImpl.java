package org.example.datn.impl;

import org.example.datn.entity.DiaChiGiaHang;
import org.example.datn.entity.HoaDon;
import org.example.datn.repository.DiaChiGiaHangRepository;
import org.example.datn.repository.HoaDonRepository;
import org.example.datn.service.DiaChiGiaoHangService;
import org.example.datn.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaChiGiaoHangServiceImpl implements DiaChiGiaoHangService {

    @Autowired
    DiaChiGiaHangRepository diaChiGiaHangRepository;

    @Override
    public List<DiaChiGiaHang> findAll() {
        return diaChiGiaHangRepository.findAll();
    }

    @Override
    public DiaChiGiaHang findById(Long id) {
        return diaChiGiaHangRepository.findById(id).get();
    }

    @Override
    public List<DiaChiGiaHang> findByCateId(Long cid) {
        return diaChiGiaHangRepository.findByCateId(cid);
    }
    @Override
    public DiaChiGiaHang create(DiaChiGiaHang product) {
        return diaChiGiaHangRepository.save(product);
    }

    @Override
    public DiaChiGiaHang update(DiaChiGiaHang product) {
        return diaChiGiaHangRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        diaChiGiaHangRepository.deleteById(id);
    }

}
