package org.example.datn.transformer;

import org.example.datn.entity.DanhMuc;
import org.example.datn.model.response.DanhMucModel;

import java.util.List;
import java.util.stream.Collectors;

public class DanhMucTransformer {

    public static DanhMucModel toModel(DanhMuc danhMuc) {
        if (danhMuc == null) {
            return null;
        }
        DanhMucModel model = new DanhMucModel();
        model.setId(danhMuc.getId());
        model.setIdCha(danhMuc.getIdCha());
        model.setTen(danhMuc.getTen());
        model.setMoTa(danhMuc.getMoTa());
        model.setTrangThai(danhMuc.getTrangThai());
        model.setNgayTao(danhMuc.getNgayTao());
        model.setNgayCapNhat(danhMuc.getNgayCapNhat());
        return model;
    }

    public static DanhMuc toEntity(DanhMucModel model) {
        if (model == null) {
            return null;
        }
        DanhMuc danhMuc = new DanhMuc();
        danhMuc.setId(model.getId());
        danhMuc.setIdCha(model.getIdCha());
        danhMuc.setTen(model.getTen());
        danhMuc.setMoTa(model.getMoTa());
        danhMuc.setTrangThai(model.getTrangThai());
        model.setNgayTao(model.getNgayTao());
        model.setNgayCapNhat(model.getNgayCapNhat());
        return danhMuc;
    }

    public static List<DanhMucModel> toModelList(List<DanhMuc> danhMucs) {
        return danhMucs.stream().map(DanhMucTransformer::toModel).collect(Collectors.toList());
    }
}
