package org.example.datn.service;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.HoaDonChiTiet;
import org.example.datn.model.request.HDRequest;
import org.example.datn.repository.HoaDonChiTietRepository;
import org.example.datn.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HDService {
    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Transactional
    public HoaDon taoHoaDon(HDRequest hdRrequest) {
        HoaDon hoaDon = new HoaDon();
        hoaDon.setIdNguoiDung(hdRrequest.getIdCustomer());
        hoaDon.setTongTien(hdRrequest.getTotalBill());
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setNgayThanhToan(LocalDateTime.now());
        HoaDon savedHoaDon = hoaDonRepository.save(hoaDon);
        String maHoaDon = "HD" + String.format("%07d", savedHoaDon.getId());
        savedHoaDon.setMa(maHoaDon);

        List<HoaDonChiTiet> chiTietList = hdRrequest.getItems().stream().map(hdctRequest -> {
            HoaDonChiTiet chiTiet = new HoaDonChiTiet();
            chiTiet.setIdHoaDon(savedHoaDon.getId());
            chiTiet.setIdSanPhamChiTiet(hdctRequest.getId());
            chiTiet.setSoLuong(hdctRequest.getSoLuong());
            chiTiet.setNgayTao(LocalDateTime.now());
            return chiTiet;
        }).collect(Collectors.toList());

        hoaDonChiTietRepository.saveAll(chiTietList);

        return savedHoaDon;
    }
}
