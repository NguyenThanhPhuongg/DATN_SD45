package org.example.datn.restController;

import org.example.datn.model.response.DanhMucModel;
import org.example.datn.processor.DanhMucProcessor;
import org.example.datn.service.DMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/danhmuc")
public class DanhMucController {

    private final DMService danhMucService;

    @Autowired
    public DanhMucController(DMService danhMucService) {
        this.danhMucService = danhMucService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanhMucModel> getById(@PathVariable Long id) {
        DanhMucModel model = danhMucService.getById(id);
        if (model != null) {
            return ResponseEntity.ok(model);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<DanhMucModel> update(@PathVariable Long id, @RequestBody DanhMucModel model) {
        DanhMucModel updatedModel = danhMucService.update(id, model);
        if (updatedModel != null) {
            return ResponseEntity.ok(updatedModel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public List<DanhMucModel> getAll() {
        return danhMucService.getAll();
    }

    @PostMapping
    public ResponseEntity<DanhMucModel> create(@RequestBody DanhMucModel model) {
        DanhMucModel savedModel = danhMucService.save(model);
        return ResponseEntity.ok(savedModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        danhMucService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
