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
import javax.transaction.Transactional;
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

    public ServiceResult findByIdNguoiDung(UserAuthentication ua){
        var list = service.findByIdNguoiDung(ua.getPrincipal());
        var models = list.stream().map(this :: mapToModel).collect(Collectors.toList());

        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);

    }

    public ServiceResult getActive(UserAuthentication ua){
        var list = service.findByIdNguoiDungAndTrangThai(ua.getPrincipal(), SystemConstant.ACTIVE);
        var models = list.stream().map(this :: mapToModel);
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);

    }

    public DiaChiGiaoHangModel findById(Long id) {
        return service.findById(id)
                .map(transformer::toModel)
                .orElseThrow(() -> new EntityNotFoundException("diaChiGiaoHang.not.found"));
    }


    private DiaChiGiaoHangModel mapToModel(DiaChiGiaoHang diaChiGiaoHang) {
        DiaChiGiaoHangModel model = new DiaChiGiaoHangModel();
        model.setId(diaChiGiaoHang.getId());
        model.setIdNguoiDung(diaChiGiaoHang.getIdNguoiDung());
        model.setHoTen(diaChiGiaoHang.getHoTen());
        model.setSdt(diaChiGiaoHang.getSdt());
        model.setDiaChi(diaChiGiaoHang.getDiaChi());
        model.setThanhPho(diaChiGiaoHang.getThanhPho());
        model.setQuocGia(diaChiGiaoHang.getQuocGia());
        model.setTrangThai(diaChiGiaoHang.getTrangThai());
        // Có thể thêm logic để lấy UserModel nếu cần
        return model;
    }

    private DiaChiGiaoHang mapToEntity(DiaChiGiaoHangRequest model) {
        DiaChiGiaoHang diaChiGiaoHang = new DiaChiGiaoHang();
        diaChiGiaoHang.setHoTen(model.getHoTen());
        diaChiGiaoHang.setSdt(model.getSdt());
        diaChiGiaoHang.setDiaChi(model.getDiaChi());
        diaChiGiaoHang.setThanhPho(model.getThanhPho());
        diaChiGiaoHang.setQuocGia(model.getQuocGia());
        // Nếu cần, có thể thêm logic để thiết lập UserModel hoặc các thuộc tính khác
        return diaChiGiaoHang;
    }

    @Transactional(rollbackOn = Exception.class)
    public ServiceResult insert(DiaChiGiaoHangRequest request, UserAuthentication ua){
        var entity = mapToEntity(request);
        entity.setIdNguoiDung(ua.getPrincipal());
        entity.setTrangThai(0);
        service.save(entity);
        return new ServiceResult();

    }


}
