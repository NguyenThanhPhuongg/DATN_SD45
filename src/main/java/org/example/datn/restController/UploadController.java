package org.example.datn.restController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.example.datn.entity.SanPham;
import org.example.datn.service.SanPhamService;
import org.example.datn.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.io.File;

@CrossOrigin("*")
@RestController
public class UploadController {
    @Autowired
    UploadService uploadService;

    @PostMapping("/rest/upload/{folder}")
    public JsonNode upload(@RequestParam("file") MultipartFile file, @PathVariable("folder") String folder){
        File savedFile = uploadService.save(file, folder);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", savedFile.getName());
        node.put("size", savedFile.length());
        return node;
    }

    @Autowired
    SanPhamService sanPhamService; // Dịch vụ để quản lý sản phẩm

    @PostMapping("/rest/update-image/{id}")
    public JsonNode updateImage(@PathVariable("id") Long id,
                                @RequestParam("file") MultipartFile file) {
        // Tìm sản phẩm theo ID
        SanPham product = sanPhamService.findById(id);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        // Lưu ảnh mới
        File savedFile = uploadService.save(file, "images"); // Cập nhật đường dẫn nếu cần

        // Cập nhật thông tin ảnh của sản phẩm
        product.setAnh(savedFile.getName());

        // Lưu sản phẩm đã cập nhật
        sanPhamService.create(product);

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", savedFile.getName());
        node.put("size", savedFile.length());
        return node;
    }

}
