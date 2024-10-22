package org.example.datn.restController;

import io.swagger.annotations.ApiOperation;
import org.example.datn.entity.DiaChiGiaoHang;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.DiaChiGiaoHangRequest;
import org.example.datn.processor.DiaChiGiaoHangProcessor;
import org.example.datn.service.DiaChiGiaoHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/dcgh")
public class DiaChiGiaoHangController {
//    @Autowired
//    private DiaChiGiaoHangProcessor processor;
//
//    @PostMapping("/create")
//    public ServiceResult create(@Valid @RequestBody DiaChiGiaoHangRequest request, UserAuthentication ua) {
//        return processor.create(request, ua);
//    }


//    @GetMapping("{id}")
//    public DiaChiGiaoHang getOne(@PathVariable("id") Long id) {
//        return diaChiGiaoHangService.findById(id);
//    }
//
//    @GetMapping()
//    public List<DiaChiGiaoHang> getAll() {
//        return diaChiGiaoHangService.findAll();
//    }
//
//    @PostMapping
//    public DiaChiGiaoHang create(@RequestBody DiaChiGiaoHang product) {
//        return diaChiGiaoHangService.create(product);
//    }
//
//    @PutMapping("{id}")
//    public DiaChiGiaoHang update(@PathVariable("id") Integer id, @RequestBody DiaChiGiaoHang product) {
//        return diaChiGiaoHangService.update(product);
//    }
//
//    @DeleteMapping("{id}")
//    public void delete(@PathVariable("id") Long id) {
//        diaChiGiaoHangService.delete(id);
//    }


}
