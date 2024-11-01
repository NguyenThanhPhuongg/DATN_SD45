package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.MauSac;
import org.example.datn.entity.Size;
import org.example.datn.model.ServiceResult;
import org.example.datn.service.MauSacService;
import org.example.datn.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * @author hoangKhong
 */
@Component
public class MauSacProcessor {

    @Autowired
    MauSacService service;

    public ServiceResult getList() {
        return new ServiceResult(service.findAll(), SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        Optional<MauSac> size = service.findById(id);
        return size.map(value -> new ServiceResult(value, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200))
                .orElseGet(() -> new ServiceResult(null, SystemConstant.STATUS_FAIL, SystemConstant.CODE_200));
    }

    public ServiceResult save(MauSac mauSac) {
        service.save(mauSac);
        return new ServiceResult(mauSac, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult delete(Long id) {
        service.deleteById(id);
        return new ServiceResult(null, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
}