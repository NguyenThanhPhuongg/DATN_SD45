package org.example.datn.restController;

import org.example.datn.entity.ChatLieu;
import org.example.datn.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/rest/chatlieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("{id}")
    public ChatLieu getOne(@PathVariable("id") Long id) {
        return chatLieuService.findById(id);
    }

    @GetMapping()
    public List<ChatLieu> getAll() {
        return chatLieuService.findAll();
    }

    @PostMapping
    public ChatLieu create(@RequestBody ChatLieu product) {
        return chatLieuService.create(product);
    }

    @PutMapping("{id}")
    public ChatLieu update(@PathVariable("id") Integer id, @RequestBody ChatLieu product) {
        return chatLieuService.update(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        chatLieuService.delete(id);
    }
}
