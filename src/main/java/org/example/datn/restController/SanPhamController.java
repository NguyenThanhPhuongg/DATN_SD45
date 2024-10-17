package org.example.datn.restController;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.SanPham;
import org.example.datn.service.ChatLieuService;
import org.example.datn.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/sanpham")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("{id}")
    public SanPham getOne(@PathVariable("id") Long id) {
        return sanPhamService.findById(id);
    }

    @GetMapping()
    public List<SanPham> getAll() {
        return sanPhamService.findAll();
    }

    @PostMapping
    public SanPham create(@RequestBody SanPham product) {
        return sanPhamService.create(product);
    }

    @PutMapping("{id}")
    public SanPham update(@PathVariable("id") Integer id, @RequestBody SanPham product) {
        return sanPhamService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        sanPhamService.delete(id);
    }


}
