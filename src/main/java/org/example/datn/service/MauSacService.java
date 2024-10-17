package org.example.datn.service;

import org.example.datn.entity.MauSac;
import org.example.datn.entity.Size;

import java.util.List;

public interface MauSacService {

    List<MauSac> findAll();
    MauSac findById(Long id);

    List<MauSac> findByCateId(Long cid);

    MauSac create(MauSac product);

    MauSac update(MauSac product);

    void delete(Long id);
}
