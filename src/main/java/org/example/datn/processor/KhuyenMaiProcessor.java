package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.KhuyenMai;
import org.example.datn.entity.MauSac;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.DanhMucRequest;
import org.example.datn.model.request.KhuyenMaiRequest;
import org.example.datn.model.response.DanhMucModel;
import org.example.datn.model.response.KhuyenMaiModel;
import org.example.datn.service.DanhMucService;
import org.example.datn.service.KhuyenMaiService;
import org.example.datn.service.MauSacService;
import org.example.datn.transformer.DanhMucTransformer;
import org.example.datn.transformer.KhuyenMaiTransformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class KhuyenMaiProcessor {
    @Autowired
    KhuyenMaiService service;

    public ServiceResult getList() {
        return new ServiceResult(service.findAll(), SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        Optional<KhuyenMai> size = service.findById(id);
        return size.map(value -> new ServiceResult(value, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200))
                .orElseGet(() -> new ServiceResult(null, SystemConstant.STATUS_FAIL, SystemConstant.CODE_200));
    }

    public ServiceResult save(KhuyenMai khuyenMai) {
        service.save(khuyenMai);
        return new ServiceResult(khuyenMai, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult delete(Long id) {
        service.deleteById(id);
        return new ServiceResult(null, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
}
