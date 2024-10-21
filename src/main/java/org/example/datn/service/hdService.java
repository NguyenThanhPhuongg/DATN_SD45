package org.example.datn.service;

import org.example.datn.model.response.HoaDonModel;
import org.example.datn.repository.ChucNangRepository;
import org.example.datn.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

/**
 * @author hoangKhong
 */
@Service
public class hdService {

    @Autowired
    private HoaDonRepository repo;



}
