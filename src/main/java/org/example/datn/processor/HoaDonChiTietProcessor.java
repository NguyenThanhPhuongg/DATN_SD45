package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.HoaDon;
import org.example.datn.entity.HoaDonChiTiet;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.HoaDonChiTietRequest;
import org.example.datn.model.response.HoaDonChiTietModel;
import org.example.datn.model.response.HoaDonModel;
import org.example.datn.service.*;
import org.example.datn.transformer.HoaDonChiTietTransformer;
import org.example.datn.transformer.HoaDonTransformer;
import org.example.datn.transformer.SanPhamChiTietTransformer;
import org.example.datn.transformer.SanPhamTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import javax.persistence.EntityNotFoundException;
import java.util.stream.Collectors;

/**
 * @author hoangKhong
 */
@Component
public class HoaDonChiTietProcessor {

    @Autowired
    HoaDonChiTietService service;
    @Autowired
    HoaDonTransformer hoaDonTransformer;
    @Autowired
    HoaDonService hoaDonService;
    @Autowired
    HoaDonChiTietTransformer hoaDonChiTietTransformer;
    @Autowired
    SanPhamChiTietService sanPhamChiTietService;
    @Autowired
    SanPhamChiTietTransformer sanPhamChiTietTransformer;
    @Autowired
    private SanPhamService sanPhamService;
    @Autowired
    private SanPhamTransformer sanPhamTransformer;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private MauSacService mauSacService;

    @Autowired
    SanPhamChiTietProcessor sanPhamChiTietprocessor;

    public ServiceResult getListByStatus(HoaDonChiTietRequest request, UserAuthentication ua) {
        var idHoaDons = hoaDonService.findByIdNguoiDung(ua.getPrincipal()).stream()
                .map(HoaDon::getId)
                .collect(Collectors.toList());
        var hoaDonChiTiets = service.findByIdHoaDonInAndTrangThai(idHoaDons, request.getStatus());
        var models = hoaDonChiTiets.stream()
                .map(hoaDonChiTiet -> {
                    var model = hoaDonChiTietTransformer.toModel(hoaDonChiTiet);
                    sanPhamChiTietService.findById(hoaDonChiTiet.getIdSanPhamChiTiet())
                            .ifPresent(sanPhamChiTiet -> {
                                var spctModel = sanPhamChiTietTransformer.toModel(sanPhamChiTiet);
                                sanPhamService.findById(sanPhamChiTiet.getIdSanPham())
                                        .ifPresent(sanPham -> {
                                            var sanPhamModel = sanPhamTransformer.toModel(sanPham);
                                            spctModel.setSanPhamModel(sanPhamModel);
                                        });
                                var size = sizeService.findById(sanPhamChiTiet.getIdSize()).orElse(null);
                                var mauSac = mauSacService.findById(sanPhamChiTiet.getIdMauSac()).orElse(null);
                                spctModel.setSize(size);
                                spctModel.setMauSac(mauSac);
                                model.setSanPhamChiTietModel(spctModel);

                            });
                    return model;
                })
                .collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    private HoaDonChiTietModel toModel(HoaDonChiTiet hoaDon) {
        if (hoaDon == null) {
            return null;
        }

        HoaDonChiTietModel model = new HoaDonChiTietModel();
        model.setId(hoaDon.getId());
        model.setIdHoaDon(hoaDon.getIdHoaDon());
        model.setGia(hoaDon.getGia());
        model.setSoLuong(hoaDon.getSoLuong());
        model.setIdSanPhamChiTiet(hoaDon.getIdSanPhamChiTiet());
        model.setTrangThai(hoaDon.getTrangThai());
        return model;
    }
    public ServiceResult getAll() {
        var list = service.findAll();
        var models = list.stream().map(hoaDonChiTiet -> {
            var model = toModel(hoaDonChiTiet);
            var sanPhamChiTiet = sanPhamChiTietprocessor.findById(hoaDonChiTiet.getIdSanPhamChiTiet());
            model.setSanPhamChiTietModel(sanPhamChiTiet);
            return model;
        }).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        var model = service.findById(id)
               .map(hoaDonChiTiet -> {
                    var m = toModel(hoaDonChiTiet);
                    var sanPhamChiTiet = sanPhamChiTietprocessor.findById(hoaDonChiTiet.getIdSanPhamChiTiet());
                    m.setSanPhamChiTietModel(sanPhamChiTiet);
                    return m;
                })
               .orElseThrow(() -> new EntityNotFoundException("hoaDonChiTiet.not.found"));
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
}
