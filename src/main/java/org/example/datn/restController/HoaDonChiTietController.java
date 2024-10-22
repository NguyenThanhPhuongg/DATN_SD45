package org.example.datn.restController;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.HoaDonChiTiet;
import org.example.datn.service.HoaDonChiTietService;
import org.example.datn.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/hdct")
public class HoaDonChiTietController {
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("{id}")
    public HoaDonChiTiet getByHoaDonId(@PathVariable("id") Long id) {
        return hoaDonChiTietService.findById(id);
    }
    @GetMapping()
    public List<HoaDonChiTiet> getAll() {
        return hoaDonChiTietService.findAll();
    }

    @PostMapping
    public HoaDonChiTiet create(@RequestBody HoaDonChiTiet product) {
        return hoaDonChiTietService.create(product);
    }

    @PutMapping("{id}")
    public HoaDonChiTiet update(@PathVariable("id") Integer id, @RequestBody HoaDonChiTiet product) {
        return hoaDonChiTietService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        hoaDonChiTietService.delete(id);
    }



}
