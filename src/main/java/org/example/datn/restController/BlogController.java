//package org.example.datn.restController;
//
//import org.example.datn.entity.Blog;
//import org.example.datn.service.BlogService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping(value = "/rest/blog")
//public class BlogController {
//    @Autowired
//    private BlogService blogService;
//
////    @GetMapping("{id}")
////    public Blog getOne(@PathVariable("id") Long id) {
////        return blogService.findById(id);
////    }
//
//    @GetMapping()
//    public List<Blog> getAll() {
//        return blogService.findAll();
//    }
//
//    @PostMapping
//    public Blog create(@RequestBody Blog product) {
//        return blogService.create(product);
//    }
//
//    @PutMapping("{id}")
//    public Blog update(@PathVariable("id") Integer id, @RequestBody Blog product) {
//        return blogService.update(product);
//    }
//
//    @DeleteMapping("{id}")
//    public void delete(@PathVariable("id") Long id) {
//        blogService.delete(id);
//    }
//}
