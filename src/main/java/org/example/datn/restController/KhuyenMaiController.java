package org.example.datn.restController;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.KhuyenMai;
import org.example.datn.service.DanhMucService;
import org.example.datn.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/khuyenmai")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("{id}")
    public KhuyenMai getOne(@PathVariable("id") Long id) {
        return khuyenMaiService.findById(id);
    }

    @GetMapping()
    public List<KhuyenMai> getAll() {
        return khuyenMaiService.findAll();
    }

    @PostMapping
    public KhuyenMai create(@RequestBody KhuyenMai product) {
        return khuyenMaiService.create(product);
    }

    @PutMapping("{id}")
    public KhuyenMai update(@PathVariable("id") Integer id, @RequestBody KhuyenMai product) {
        return khuyenMaiService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        khuyenMaiService.delete(id);
    }
}
