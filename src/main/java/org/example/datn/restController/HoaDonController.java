package org.example.datn.restController;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.SanPham;
import org.example.datn.service.HoaDonService;
import org.example.datn.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/hoadon")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;

    @GetMapping("{id}")
    public HoaDon getOne(@PathVariable("id") Long id) {
        return hoaDonService.findById(id);
    }

    @GetMapping()
    public List<HoaDon> getAll() {
        return hoaDonService.findAll();
    }

    @PostMapping
    public HoaDon create(@RequestBody HoaDon product) {
        return hoaDonService.create(product);
    }

    @PutMapping("{id}")
    public HoaDon update(@PathVariable("id") Integer id, @RequestBody HoaDon product) {
        return hoaDonService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        hoaDonService.delete(id);
    }


}
