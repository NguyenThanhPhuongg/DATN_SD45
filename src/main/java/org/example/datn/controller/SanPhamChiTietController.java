package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.SanPhamChiTietModel;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.processor.SanPhamChiTietProcessor;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamChiTietController {

    @Autowired
    SanPhamChiTietProcessor processor;
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;

//    @GetMapping
//    public List<SanPhamChiTiet> getAll() {
//        return sanPhamChiTietService.getAllActive();
//    }
//
//    //Phuong
//    // GET sp active
//    @GetMapping("/{id}")
//    public SanPhamChiTiet getActive(@PathVariable Long id) {
//        return sanPhamChiTietService.getActive(id);
//    }

    //Phuong
    //them spct vao gh
    @PostMapping("/addToCart")
    public String addToCart(@RequestParam Long idSPCT, @RequestParam Integer soLuong) {
        return sanPhamChiTietService.addToCart(idSPCT, soLuong);
    }

//  Phuong
//  Xoá sản phẩm khỏi giỏ hàng
    @DeleteMapping("/remove/{Id}")
    public String removeFromCart(@PathVariable Long id) {
        return sanPhamChiTietService.removeFromCart(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResult> getById(@PathVariable Long id) {
        return ResponseEntity.ok(processor.getById(id));
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getAll() {
        return ResponseEntity.ok(processor.getAll());
    }

    @PostMapping
    public ResponseEntity<ServiceResult> add(@RequestBody SanPhamChiTietModel model) {
        return ResponseEntity.ok(processor.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResult> update(@PathVariable Long id, @RequestBody SanPhamChiTietModel model) {
        return ResponseEntity.ok(processor.update(id, model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResult> delete(@PathVariable Long id) {
        return ResponseEntity.ok(processor.delete(id));
    }


}
