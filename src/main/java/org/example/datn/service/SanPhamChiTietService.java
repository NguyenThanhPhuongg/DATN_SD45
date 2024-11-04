package org.example.datn.service;

import lombok.RequiredArgsConstructor;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SanPhamChiTietService {
    @Autowired
    private SanPhamChiTietRepository repo;

    public Optional<SanPhamChiTiet> findById(Long id) {
        return repo.findById(id);
    }

    public List<SanPhamChiTiet> findAll() {
        return repo.findAll();
    }

    public List<SanPhamChiTiet> findByCateId(Long cid) {
        return repo.findByCateId(cid);
    }

    public SanPhamChiTiet save(SanPhamChiTiet sanPhamChiTiet) {
        return repo.save(sanPhamChiTiet);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public List<SanPhamChiTiet> findByIdIn(List<Long> ids) {
        return repo.findByIdIn(ids);
    }

    public Optional<SanPhamChiTiet> findByIdSanPhamAndIdSizeAndIdMauSac(Long idSanPham, Long idSize, Long idMauSac) {
        return repo.findByIdSanPhamAndIdSizeAndIdMauSac(idSanPham, idSize, idMauSac);
    }
    //

}
