package org.example.datn.service;

import org.example.datn.entity.MauSac;
import org.example.datn.entity.Size;
import org.example.datn.repository.MauSacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MauSacService {

    @Autowired
    private MauSacRepository repo;

    public Optional<MauSac> findById(Long id) {
        return repo.findById(id);
    }

    public List<MauSac> findAll() {
        return repo.findAll();
    }


}
