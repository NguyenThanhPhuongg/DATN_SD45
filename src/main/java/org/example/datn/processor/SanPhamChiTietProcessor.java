package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.SanPhamChiTietModel;
import org.example.datn.service.MauSacService;
import org.example.datn.service.SanPhamChiTietService;
import org.example.datn.service.SizeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;

@Component
public class SanPhamChiTietProcessor {
    @Autowired
    private SanPhamChiTietService service;

    @Autowired
    private SizeService sizeService;

    @Autowired
    private MauSacService mauSacService;

    public ServiceResult getById(Long id) {
        var s = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết sản phẩm"));
        var size = sizeService.findById(s.getIdSize()).orElse(null);
        var mauSac = mauSacService.findById(s.getIdSize()).orElse(null);
        SanPhamChiTietModel model = new SanPhamChiTietModel();
        BeanUtils.copyProperties(s, model);
        model.setSize(size);
        model.setMauSac(mauSac);

        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

}
