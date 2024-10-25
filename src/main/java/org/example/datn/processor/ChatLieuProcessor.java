package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.ChatLieu;
import org.example.datn.model.ServiceResult;
import org.example.datn.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ChatLieuProcessor {

    @Autowired
    ChatLieuService service;

    public ServiceResult getList() {
        return new ServiceResult(service.findAll(), SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        Optional<ChatLieu> size = service.findById(id);
        return size.map(value -> new ServiceResult(value, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200))
                .orElseGet(() -> new ServiceResult(null, SystemConstant.STATUS_FAIL, SystemConstant.CODE_200));
    }

    public ServiceResult save(ChatLieu chatLieu) {
        service.save(chatLieu);
        return new ServiceResult(chatLieu, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult delete(Long id) {
        service.deleteById(id);
        return new ServiceResult(null, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
}
