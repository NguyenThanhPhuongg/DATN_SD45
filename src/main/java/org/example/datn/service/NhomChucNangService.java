package org.example.datn.service;

import org.example.datn.entity.NhomChucNang;
import org.example.datn.repository.NhomChucNangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class NhomChucNangService {
    @Autowired/**
     * @author hoangKhong
     */
    private NhomChucNangRepository repo;

    public void deleteAllByNhomId(Long nhomId) {
        repo.deleteAllByIdNhom(nhomId);
    }

    public void save(Long nhomId, Long chucNangId) {
        var nhomChucNang = new NhomChucNang();
        nhomChucNang.setIdNhom(nhomId);
        nhomChucNang.setIdChucNang(nhomId);
        repo.save(nhomChucNang);
    }
}
