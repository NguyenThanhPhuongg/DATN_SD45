package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.KhuyenMai;
import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.entity.YeuCauDoiTra;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.ThuongHieuRequest;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.model.response.YeuCauDoiTraModel;
import org.example.datn.repository.SanPhamRepository;
import org.example.datn.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class YeuCauDoiTraProcessor {
    @Autowired
    private YeuCauDoiTraService service;

    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonProcessor hoaDonProcessor;
    @Autowired
    private UserService userService;
    @Autowired
    private UserProcessor userProcessor;
    public ServiceResult getById(Long id) {
        var sp = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin sản phẩm"));
        var hoadon = hoaDonService.findById(sp.getIdHoaDon()).orElse(null);
        var user = userProcessor.findById(sp.getIdNguoiDung());
        YeuCauDoiTraModel model = new YeuCauDoiTraModel();
        BeanUtils.copyProperties(sp, model);
        model.setHoaDon(hoadon);
        model.setUser(user);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getAll() {
        List<YeuCauDoiTraModel> models = service.findAll().stream().map(sp -> {
            YeuCauDoiTraModel model = new YeuCauDoiTraModel();
            BeanUtils.copyProperties(sp, model);
            model.setHoaDon(hoaDonService.findById(sp.getIdHoaDon()).orElse(null));
            model.setUser(userProcessor.findById(sp.getIdNguoiDung()));
            return model;
        }).collect(Collectors.toList());

        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult save(YeuCauDoiTra yeuCauDoiTra) {
        service.save(yeuCauDoiTra);
        return new ServiceResult(yeuCauDoiTra, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult update(Long id, YeuCauDoiTra request){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("yeuCau.not.found"));
        BeanUtils.copyProperties(request, p);
        service.save(p);
        return new ServiceResult();
    }

    public ServiceResult delete(Long id) {
        service.delete(id);
        return new ServiceResult("Sản phẩm đã được xóa thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }


}
