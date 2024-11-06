package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.SanPhamChiTietModel;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.service.MauSacService;
import org.example.datn.service.SanPhamChiTietService;
import org.example.datn.service.SanPhamService;
import org.example.datn.service.SizeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SanPhamChiTietProcessor {
    @Autowired
    private SanPhamChiTietService service;

    @Autowired
    private SizeService sizeService;
    @Autowired
    private SanPhamService sanPhamService;

    @Autowired
    private MauSacService mauSacService;

    public ServiceResult getById(Long id) {
        var s = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết sản phẩm"));
        var size = sizeService.findById(s.getIdSize()).orElse(null);
        var mauSac = mauSacService.findById(s.getIdSize()).orElse(null);
        var sanPham = sanPhamService.findById(s.getIdSanPham()).orElse(null);
        SanPhamChiTietModel model = new SanPhamChiTietModel();
        BeanUtils.copyProperties(s, model);
        model.setSize(size);
        model.setMauSac(mauSac);
        model.setSanPham(sanPham);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getAll() {
        List<SanPhamChiTietModel> models = service.findAll().stream().map(sp -> {
            SanPhamChiTietModel model = new SanPhamChiTietModel();
            BeanUtils.copyProperties(sp, model);
            model.setSanPham(sanPhamService.findById(sp.getIdSanPham()).orElse(null));
            model.setMauSac(mauSacService.findById(sp.getIdMauSac()).orElse(null));
            model.setSize(sizeService.findById(sp.getIdSize()).orElse(null));
            return model;
        }).collect(Collectors.toList());

        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult save(SanPhamChiTietModel model) {
        SanPhamChiTiet sanPham = new SanPhamChiTiet();
        BeanUtils.copyProperties(model, sanPham);
        service.save(sanPham);
        return new ServiceResult("Sản phẩm đã được thêm thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult update(Long id, SanPhamChiTietModel model) {
        SanPhamChiTiet sanPham = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sản phẩm để cập nhật"));
        BeanUtils.copyProperties(model, sanPham);
        service.save(sanPham);
        return new ServiceResult("Sản phẩm đã được cập nhật thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult delete(Long id) {
        service.deleteById(id);
        return new ServiceResult("Sản phẩm đã được xóa thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

}
