package org.example.datn.service;

import org.example.datn.entity.Thuonghieu;
import org.example.datn.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ThuongHieuService {

    List<Thuonghieu> findAll();
    Thuonghieu findById(Long id);

    List<Thuonghieu> findByCateId(Long cid);

    Thuonghieu create(Thuonghieu product);

    Thuonghieu update(Thuonghieu product);

    void delete(Long id);
}
