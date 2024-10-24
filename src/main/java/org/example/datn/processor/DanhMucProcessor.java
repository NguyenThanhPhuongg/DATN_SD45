package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.DanhMuc;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.DanhMucRequest;
import org.example.datn.model.response.DanhMucModel;
import org.example.datn.service.DanhMucService;
import org.example.datn.transformer.DanhMucTransformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.stream.Collectors;

@Component
public class DanhMucProcessor {
    @Autowired
    private DanhMucService service;
    @Autowired
    private DanhMucTransformer transformer;
    public ServiceResult save(DanhMuc request){
        service.save(request);
        return new ServiceResult();
    }

    public ServiceResult update(Long id, DanhMucRequest request){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("danhMuc.not.found"));
        BeanUtils.copyProperties(request, p);
        service.save(p);
        return new ServiceResult();
    }

    public ServiceResult delete(Long id){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
        service.delete(p);
        return new ServiceResult();
    }

    public ServiceResult findAll(){
        var list = service.getAll();
        var models = list.stream().map(transformer::toModel).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
        var model = transformer.toModel(p);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public DanhMucModel findById(Long id) {
        return service.findById(id)
                .map(transformer::toModel)
                .orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
    }
}
