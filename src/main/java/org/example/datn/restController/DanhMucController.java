package org.example.datn.restController;

import org.example.datn.entity.DanhMuc;
import org.example.datn.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/danhmuc")
public class DanhMucController {
    @Autowired
    private DanhMucService danhMucService;

    @GetMapping("{id}")
    public DanhMuc getOne(@PathVariable("id") Long id) {
        return danhMucService.findById(id);
    }

    @GetMapping()
    public List<DanhMuc> getAll() {
        return danhMucService.findAll();
    }

    @PostMapping
    public DanhMuc create(@RequestBody DanhMuc product) {
        return danhMucService.create(product);
    }

    @PutMapping("{id}")
    public DanhMuc update(@PathVariable("id") Integer id, @RequestBody DanhMuc product) {
        return danhMucService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        danhMucService.delete(id);
    }
}
