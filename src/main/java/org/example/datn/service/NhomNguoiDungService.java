package org.example.datn.service;

import org.example.datn.entity.NhomNguoiDung;
import org.example.datn.repository.NhomNguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author hoangKhong
 */
@Service
public class NhomNguoiDungService {
    @Autowired
    private NhomNguoiDungRepository repo;

    public void save(Long idNhom, Long userId) {
        var nhomNguoiDung = new NhomNguoiDung();
        nhomNguoiDung.setIdNhom(idNhom);
        nhomNguoiDung.setUserId(userId);
        repo.save(nhomNguoiDung);
    }

    public List<Long> findByGroupId(Long idNhom) {
        List<NhomNguoiDung> userGroups = repo.findByIdNhom(idNhom);
        if (!userGroups.isEmpty()) {
            return userGroups.stream()
                    .map(NhomNguoiDung::getUserId)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }
}
