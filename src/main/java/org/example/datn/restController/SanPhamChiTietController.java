package org.example.datn.restController;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.service.SanPhamChiTietService;
import org.example.datn.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/spct")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;

    @GetMapping("{id}")
    public SanPhamChiTiet getOne(@PathVariable("id") Long id) {
        return sanPhamChiTietService.findById(id);
    }

    @GetMapping()
    public List<SanPhamChiTiet> getAll() {
        return sanPhamChiTietService.findAll();
    }

    @PostMapping
    public SanPhamChiTiet create(@RequestBody SanPhamChiTiet product) {
        return sanPhamChiTietService.create(product);
    }

    @PutMapping("{id}")
    public SanPhamChiTiet update(@PathVariable("id") Integer id, @RequestBody SanPhamChiTiet product) {
        return sanPhamChiTietService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        sanPhamChiTietService.delete(id);
    }


}
