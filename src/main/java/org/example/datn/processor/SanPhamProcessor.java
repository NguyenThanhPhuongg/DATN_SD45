package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
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

}




















