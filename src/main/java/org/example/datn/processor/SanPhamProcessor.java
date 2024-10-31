package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.SanPham;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.service.ChatLieuService;
import org.example.datn.service.DanhMucService;
import org.example.datn.service.SanPhamService;
import org.example.datn.service.ThuongHieuService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SanPhamProcessor {

    @Autowired
    private SanPhamService service;

    @Autowired
    private DanhMucService danhMucService;

    @Autowired
    private ThuongHieuService thuongHieuService;

    @Autowired
    private ChatLieuService chatLieuService;


    public ServiceResult getById(Long id) {
        var sp = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin sản phẩm"));
        var danhMuc = danhMucService.findById(sp.getIdDanhMuc()).orElse(null);
        var thuongHieu = thuongHieuService.findById(sp.getIdThuongHieu()).orElse(null);
        var chatLieu = chatLieuService.findById(sp.getIdChatLieu()).orElse(null);
        SanPhamModel model = new SanPhamModel();
        BeanUtils.copyProperties(sp, model);
        model.setDanhMuc(danhMuc);
        model.setThuonghieu(thuongHieu);
        model.setChatLieu(chatLieu);

        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getAll() {
        List<SanPhamModel> models = service.findAll().stream().map(sp -> {
            SanPhamModel model = new SanPhamModel();
            BeanUtils.copyProperties(sp, model);
            model.setDanhMuc(danhMucService.findById(sp.getIdDanhMuc()).orElse(null));
            model.setThuonghieu(thuongHieuService.findById(sp.getIdThuongHieu()).orElse(null));
            model.setChatLieu(chatLieuService.findById(sp.getIdChatLieu()).orElse(null));
            return model;
        }).collect(Collectors.toList());

        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult save(SanPhamModel model) {
        SanPham sanPham = new SanPham();
        BeanUtils.copyProperties(model, sanPham);
        service.save(sanPham);
        return new ServiceResult("Sản phẩm đã được thêm thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult update(Long id, SanPhamModel model) {
        SanPham sanPham = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sản phẩm để cập nhật"));
        BeanUtils.copyProperties(model, sanPham);
        service.update(sanPham);
        return new ServiceResult("Sản phẩm đã được cập nhật thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult delete(Long id) {
        service.delete(id);
        return new ServiceResult("Sản phẩm đã được xóa thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
}




















