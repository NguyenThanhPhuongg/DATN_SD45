package org.example.datn.service;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.HoaDon;
import org.example.datn.entity.PhuongThucVanChuyen;
import org.example.datn.model.response.DanhMucModel;
import org.example.datn.processor.DanhMucProcessor;
import org.example.datn.repository.DanhMucRepository;
import org.example.datn.transformer.DanhMucTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DMService {
    @Autowired
    private DanhMucRepository repo;

    public List<DanhMuc> getAll() {
        return repo.findAll();
    }

    public void save(DanhMuc danhMuc) {
        repo.save(danhMuc);
    }

    public Optional<DanhMuc> findById(Long id) {
        return repo.findById(id);
    }

    public void delete(DanhMuc danhMuc) {
        repo.delete(danhMuc);
    }

    public List<DanhMuc> getActive() {
        return repo.findByTrangThai(SystemConstant.ACTIVE);
    }
}
