package org.example.datn.restController;

import org.example.datn.entity.MauSac;
import org.example.datn.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/mausac")
public class MauSacController {
    @Autowired
    private MauSacService mauSacService;

    @GetMapping("{id}")
    public MauSac getOne(@PathVariable("id") Long id) {
        return mauSacService.findById(id);
    }

    @GetMapping()
    public List<MauSac> getAll() {
        return mauSacService.findAll();
    }

    @PostMapping
    public MauSac create(@RequestBody MauSac product) {
        return mauSacService.create(product);
    }

    @PutMapping("{id}")
    public MauSac update(@PathVariable("id") Integer id, @RequestBody MauSac product) {
        return mauSacService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        mauSacService.delete(id);
    }
}
