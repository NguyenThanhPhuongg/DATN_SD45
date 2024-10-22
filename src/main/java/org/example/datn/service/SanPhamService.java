package org.example.datn.service;

<<<<<<< HEAD
import org.example.datn.entity.SanPham;
import org.example.datn.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    //    Lấy toàn bộ sản phẩm
    public List<SanPham> getAll() {
        return this.sanPhamRepository.findAll();
    }

    //    Lấy sản phẩm theo ID
    public SanPham getSanPhamByID(Long id) {
        return this.sanPhamRepository.findById(id).orElse(null);
    }

    //    Lưu or cập nhật sản phẩm
    public void saveOrUpdateSanPham(SanPham sanPham) {
        this.sanPhamRepository.save(sanPham);
    }

    //     Cập nhật trạng thái của sản phẩm theo ID
    public void updateSanPhamStatus(Long id, Integer newStatus) {
        SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
        if (sanPham != null) {
            sanPham.setTrangThai(newStatus);
            sanPhamRepository.save(sanPham);
        }
    }

    //    Phần trag
    public Page<SanPham> getAllProducts(Pageable pageable) {
        return this.sanPhamRepository.findAll(pageable);
    }
=======
import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.SanPham;

import java.util.List;

public interface SanPhamService {

    List<SanPham> findAll();
    SanPham findById(Long id);

    List<SanPham> findByCateId(Long cid);

    SanPham create(SanPham product);

    SanPham update(SanPham product);

    void delete(Long id);
>>>>>>> ed8b9726fd62aaec701e33c3fcf229779dfeab88
}
