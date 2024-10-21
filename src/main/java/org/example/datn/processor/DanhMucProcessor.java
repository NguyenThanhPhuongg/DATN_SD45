package org.example.datn.processor;

import org.example.datn.entity.DanhMuc;
import org.example.datn.model.response.DanhMucModel;
import org.example.datn.service.DMService;
import org.example.datn.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DanhMucProcessor {

    public DanhMuc toEntity(DanhMucModel model) {
        if (model == null) {
            return null;
        }
        DanhMuc entity = new DanhMuc();
        entity.setId(model.getId());
        entity.setIdCha(model.getIdCha());
        entity.setTen(model.getTen());
        entity.setMoTa(model.getMoTa());
        entity.setTrangThai(model.getTrangThai());
        entity.setNgayTao(model.getNgayTao());
        entity.setNgayCapNhat(model.getNgayCapNhat());
        entity.setNguoiTao(model.getNguoiTao());
        entity.setNguoiCapNhat(model.getNguoiCapNhat());
        return entity;
    }

    public DanhMucModel toModel(DanhMuc entity) {
        if (entity == null) {
            return null;
        }
        DanhMucModel model = new DanhMucModel();
        model.setId(entity.getId());
        model.setIdCha(entity.getIdCha());
        model.setTen(entity.getTen());
        model.setMoTa(entity.getMoTa());
        model.setTrangThai(entity.getTrangThai());
        model.setNgayTao(entity.getNgayTao());
        model.setNgayCapNhat(entity.getNgayCapNhat());
        model.setNguoiTao(entity.getNguoiTao());
        model.setNguoiCapNhat(entity.getNguoiCapNhat());
        return model;
    }

    public List<DanhMucModel> toModels(List<DanhMuc> entities) {
        return entities.stream()
                .map(this::toModel)
                .collect(Collectors.toList());
    }
}
