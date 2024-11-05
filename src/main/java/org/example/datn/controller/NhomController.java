package org.example.datn.controller;

import io.swagger.annotations.ApiOperation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.exception.DuplicatedException;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.request.GroupQueryModel;
import org.example.datn.model.response.RegisterUpdateGroupModel;
import org.example.datn.processor.NhomProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController("NhomApi")
@RequestMapping("/nhom")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NhomController {

    @Autowired
    NhomProcessor processor;

    @PostMapping("/list_page")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ServiceResult getAll(@RequestBody GroupQueryModel model) {
        return processor.getList(model);
    }

    @PostMapping
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ServiceResult add(@Valid @RequestBody RegisterUpdateGroupModel model) throws DuplicatedException {
        return processor.add(model);
    }
}
