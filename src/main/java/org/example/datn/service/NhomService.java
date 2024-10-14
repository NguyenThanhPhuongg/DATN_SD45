package org.example.datn.service;

import javax.persistence.EntityManager;
import org.example.datn.entity.Nhom;
import org.example.datn.repository.NhomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hoangKhong
 */
@Service
public class NhomService {
    @Autowired
    NhomRepository repo;

    private EntityManager entityManager;


    public NhomService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Nhom> findNhomByUserId(Long userId) {
       return repo.findNhomByUserId(userId);
    }

}
