package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.DiaChiGiaoHang;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.DiaChiGiaoHangRequest;
import org.example.datn.model.response.DiaChiGiaoHangModel;
import org.example.datn.model.response.UserModel;
import org.example.datn.service.DiaChiGiaoHangService;
import org.example.datn.service.UserService;
import org.example.datn.transformer.DiaChiGiaoHangTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DiaChiGiaoHangProcessor {
    @Autowired
    private DiaChiGiaoHangService service;

    @Autowired
    private DiaChiGiaoHangTransformer transformer;

    @Autowired
    private UserProcessor userProcessor;

    public ServiceResult getById(Long id){
        var entity = service.findById(id).orElseThrow(() -> new EntityNotFoundException("diaChiGiaoHang.not.found"));
        var model = transformer.toModel(entity);
        var user = userProcessor.findById(entity.getId());
        model.setUserModel(user);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult create(DiaChiGiaoHangRequest request, UserAuthentication ua){
        var a = transformer.toEntity(request);
        a.setIdNguoiDung(ua.getPrincipal());
        service.save(a);
        return new ServiceResult();
    }

    public ServiceResult update(Long id, DiaChiGiaoHangRequest request, UserAuthentication ua){
        var entity = service.findById(id).orElseThrow(() -> new EntityNotFoundException("diaChiGiaoHang.not.found"));
        entity.setHoTen(request.getHoTen());
        entity.setSdt(request.getSdt());
        entity.setDiaChi(request.getDiaChi());
        entity.setThanhPho(request.getThanhPho());
        entity.setQuocGia(request.getQuocGia());
        service.save(entity);
        return new ServiceResult();
    }

    public ServiceResult deleteById(Long id){
        var entity = service.findById(id).orElseThrow(() -> new EntityNotFoundException("diaChiGiaoHang.not.found"));
        service.delete(entity);
        return new ServiceResult();
    }

    public ServiceResult findByIdNguoiDung(Long idNguoiDung){
        var list = service.findByIdNguoiDung(idNguoiDung);
        var models = list.stream().map(transformer::toModel).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public DiaChiGiaoHangModel findById(Long id) {
        return service.findById(id)
                .map(transformer::toModel)
                .orElseThrow(() -> new EntityNotFoundException("diaChiGiaoHang.not.found"));
    }


}
