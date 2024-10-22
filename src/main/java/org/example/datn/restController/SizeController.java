package org.example.datn.restController;

import org.example.datn.entity.Size;
import org.example.datn.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/size")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping("{id}")
    public Size getOne(@PathVariable("id") Long id) {
        return sizeService.findById(id);
    }

    @GetMapping()
    public List<Size> getAll() {
        return sizeService.findAll();
    }

    @PostMapping
    public Size create(@RequestBody Size product) {
        return sizeService.create(product);
    }

    @PutMapping("{id}")
    public Size update(@PathVariable("id") Integer id, @RequestBody Size product) {
        return sizeService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        sizeService.delete(id);
    }
}
