package org.example.datn.service;
import org.example.datn.entity.DanhMuc;
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
    private final DanhMucRepository danhMucRepository;
    private final DanhMucProcessor danhMucProcessor;

    @Autowired
    public DMService(DanhMucRepository danhMucRepository, DanhMucProcessor danhMucProcessor) {
        this.danhMucRepository = danhMucRepository;
        this.danhMucProcessor = danhMucProcessor;
    }

    public List<DanhMucModel> getAll() {
        return danhMucProcessor.toModels(danhMucRepository.findAll());
    }
    public DanhMucModel getById(Long id) {
        return danhMucProcessor.toModel(danhMucRepository.findById(id).orElse(null));
    }
    public DanhMucModel update(Long id, DanhMucModel model) {
        Optional<DanhMuc> existingEntity = danhMucRepository.findById(id);
        if (existingEntity.isPresent()) {
            // Cập nhật các trường của entity
            DanhMuc danhMuc = existingEntity.get();
            danhMuc.setIdCha(model.getIdCha());
            danhMuc.setTen(model.getTen());
            danhMuc.setMoTa(model.getMoTa());
            danhMuc.setTrangThai(model.getTrangThai());
            danhMuc.setNgayCapNhat(new Date()); // cập nhật thời gian
            danhMuc.setNguoiCapNhat(model.getNguoiCapNhat());
            return danhMucProcessor.toModel(danhMucRepository.save(danhMuc));
        } else {
            return null; // Không tìm thấy
        }
    }
    public DanhMucModel save(DanhMucModel model) {
        return danhMucProcessor.toModel(danhMucRepository.save(danhMucProcessor.toEntity(model)));
    }

    public void delete(Long id) {
        danhMucRepository.deleteById(id);
    }

}
