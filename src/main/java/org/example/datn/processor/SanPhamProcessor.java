package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
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
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;
    @Autowired
    private MauSacService mauSacService;
    @Autowired
    private SizeService sizeService;

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
        var spct = sanPhamChiTietService.findByIdSanPham(id);
        var idSizes = spct.stream().map(SanPhamChiTiet::getIdSize).collect(Collectors.toList());
        var idMauSacs = spct.stream().map(SanPhamChiTiet::getIdMauSac).collect(Collectors.toList());
        var sizes = sizeService.findByIdIn(idSizes);
        var mauSac = mauSacService.findByIdIn(idMauSacs);
        model.setListSize(sizes);
        model.setListMauSac(mauSac);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

}




















