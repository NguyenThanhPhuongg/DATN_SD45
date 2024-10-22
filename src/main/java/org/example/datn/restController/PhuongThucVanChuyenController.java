package org.example.datn.restController;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.PhuongThucVanChuyen;
import org.example.datn.service.HoaDonService;
import org.example.datn.service.PhuongThucVanChuyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/ptvc")
public class PhuongThucVanChuyenController {
    @Autowired
    private PhuongThucVanChuyenService phuongThucVanChuyenService;

    @GetMapping("{id}")
    public PhuongThucVanChuyen getOne(@PathVariable("id") Long id) {
        return phuongThucVanChuyenService.findById(id);
    }

    @GetMapping()
    public List<PhuongThucVanChuyen> getAll() {
        return phuongThucVanChuyenService.findAll();
    }

    @PostMapping
    public PhuongThucVanChuyen create(@RequestBody PhuongThucVanChuyen product) {
        return phuongThucVanChuyenService.create(product);
    }

    @PutMapping("{id}")
    public PhuongThucVanChuyen update(@PathVariable("id") Integer id, @RequestBody PhuongThucVanChuyen product) {
        return phuongThucVanChuyenService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        phuongThucVanChuyenService.delete(id);
    }


}
