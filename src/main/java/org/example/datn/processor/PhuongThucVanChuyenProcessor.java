package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.PhuongThucVanChuyenRequest;
import org.example.datn.model.response.DiaChiGiaoHangModel;
import org.example.datn.model.response.PhuongThucVanChuyenModel;
import org.example.datn.service.PhuongThucVanChuyenService;
import org.example.datn.transformer.PhuongThucVanChuyenTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.beans.BeanUtils;

import javax.persistence.EntityNotFoundException;
import java.util.stream.Collectors;

@Component
public class PhuongThucVanChuyenProcessor {

    @Autowired
    private PhuongThucVanChuyenService service;

    @Autowired
    private PhuongThucVanChuyenTransformer transformer;

    public ServiceResult save(PhuongThucVanChuyenRequest request){
        var p = transformer.toEntity(request);
        service.save(p);
        return new ServiceResult();
    }

    public ServiceResult update(Long id, PhuongThucVanChuyenRequest request){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
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
        var list = service.getActive();
        var models = list.stream().map(transformer::toModel).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id){
        var p = service.findById(id).orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
        var model = transformer.toModel(p);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public PhuongThucVanChuyenModel findById(Long id) {
        return service.findById(id)
                .map(transformer::toModel)
                .orElseThrow(() -> new EntityNotFoundException("phuongThucVanChuyen.not.found"));
    }
}
