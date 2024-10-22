package org.example.datn.restController;

import org.example.datn.entity.DiaChiGiaHang;
import org.example.datn.entity.HoaDon;
import org.example.datn.service.DiaChiGiaoHangService;
import org.example.datn.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/dcgh")
public class DiaChiGiaoHangController {
    @Autowired
    private DiaChiGiaoHangService diaChiGiaoHangService;

    @GetMapping("{id}")
    public DiaChiGiaHang getOne(@PathVariable("id") Long id) {
        return diaChiGiaoHangService.findById(id);
    }

    @GetMapping()
    public List<DiaChiGiaHang> getAll() {
        return diaChiGiaoHangService.findAll();
    }

    @PostMapping
    public DiaChiGiaHang create(@RequestBody DiaChiGiaHang product) {
        return diaChiGiaoHangService.create(product);
    }

    @PutMapping("{id}")
    public DiaChiGiaHang update(@PathVariable("id") Integer id, @RequestBody DiaChiGiaHang product) {
        return diaChiGiaoHangService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        diaChiGiaoHangService.delete(id);
    }


}
