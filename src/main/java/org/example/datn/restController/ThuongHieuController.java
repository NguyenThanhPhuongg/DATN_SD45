package org.example.datn.restController;

import org.example.datn.entity.Thuonghieu;
import org.example.datn.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/thuonghieu")
public class ThuongHieuController {
    @Autowired
    private ThuongHieuService thuongHieuService;

    @GetMapping("{id}")
    public Thuonghieu getOne(@PathVariable("id") Long id) {
        return thuongHieuService.findById(id);
    }

    @GetMapping()
    public List<Thuonghieu> getAll() {
        return thuongHieuService.findAll();
    }

    @PostMapping
    public Thuonghieu create(@RequestBody Thuonghieu product) {
        return thuongHieuService.create(product);
    }

    @PutMapping("{id}")
    public Thuonghieu update(@PathVariable("id") Integer id, @RequestBody Thuonghieu product) {
        return thuongHieuService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        thuongHieuService.delete(id);
    }
}
