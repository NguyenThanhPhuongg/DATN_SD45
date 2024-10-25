package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.GioHangChiTiet;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.GioHangChiTietRequest;
import org.example.datn.model.response.GioHangChiTietModel;
import org.example.datn.service.GioHangChiTietService;
import org.example.datn.service.GioHangService;
import org.example.datn.service.SanPhamChiTietService;
import org.example.datn.transformer.GioHangChiTietTranformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class GioHangChiTietProcessor {

    @Autowired
    private GioHangChiTietService service;

    @Autowired
    private GioHangService gioHangService;

    @Autowired
    private GioHangChiTietTranformer tranformer;

    @Autowired
    private SanPhamChiTietService spctService;

    @Transactional(rollbackOn = Exception.class)
    public ServiceResult save(GioHangChiTietRequest request, UserAuthentication ua) {

        var gioHang = gioHangService.findByIdNguoiDung(ua.getPrincipal()).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));
//        var gioHangChiTiet = new GioHangChiTiet();
//        BeanUtils.copyProperties(request, gioHangChiTiet);
//        gioHangChiTiet.setIdGioHang(gioHang.getId());
        var spct = spctService.findByIdSanPhamAndIdSizeAndIdMauSac(request.getIdSanPham(), request.getIdSize(), request.getIdMauSac())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin sản phẩm"));
        var soLuongConLai = spct.getSoLuong();
        if (request.getSoLuong() > soLuongConLai) {
            throw new IllegalArgumentException("Số lượng yêu cầu vượt quá số lượng tồn kho.");
        }

        var gioHangChiTiet = service.findByIdGioHangAndIdSanPhamChiTiet(gioHang.getId(), spct.getId());

        if (gioHangChiTiet.isPresent()) {
            var currentQuantity = gioHangChiTiet.get().getSoLuong();
            var newQuantity = currentQuantity + request.getSoLuong();

            gioHangChiTiet.get().setSoLuong(newQuantity);
            service.save(gioHangChiTiet.get());

            spct.setSoLuong(soLuongConLai - request.getSoLuong());
        } else {
            GioHangChiTiet ghct = new GioHangChiTiet();
            BeanUtils.copyProperties(request, ghct);
            ghct.setIdGioHang(gioHang.getId());
            ghct.setGia(spct.getGia().multiply(BigDecimal.valueOf(request.getSoLuong())));
            service.save(ghct);
            spct.setSoLuong(soLuongConLai - request.getSoLuong());
        }
        spctService.save(spct);
        return new ServiceResult();
    }

    @Transactional(rollbackOn = Exception.class)
    public ServiceResult update(Long id, GioHangChiTietRequest request, UserAuthentication ua) {
        var gioHangChiTiet = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết giỏ hàng"));

        var spct = spctService.findById(gioHangChiTiet.getIdSanPhamChiTiet()).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết sản phẩm"));
        gioHangChiTiet.setSoLuong(request.getSoLuong());
        var currentQuantity = gioHangChiTiet.getSoLuong();
        var newQuantity = spct.getSoLuong() + currentQuantity - request.getSoLuong();
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Số lượng yêu cầu vượt quá số lượng tồn kho.");
        }

        spct.setSoLuong(newQuantity);

        var gia = spct.getGia().multiply(BigDecimal.valueOf(request.getSoLuong()));
        gioHangChiTiet.setGia(gia);

        service.save(gioHangChiTiet);
        spctService.save(spct);

        return new ServiceResult();
    }

    @Transactional(rollbackOn = Exception.class)
    public ServiceResult delete(Long id, UserAuthentication ua) {
        var gioHangChiTiet = service.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết giỏ hàng"));

        var spct = spctService.findById(gioHangChiTiet.getIdSanPhamChiTiet()).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy thông tin chi tiết sản phẩm"));

        var newQuantity = spct.getSoLuong() + gioHangChiTiet.getSoLuong();
        spct.setSoLuong(newQuantity);

        spctService.save(spct);

        service.deleteById(id);

        return new ServiceResult();
    }

    public ServiceResult getList(UserAuthentication ua) {
        var gioHang = gioHangService.findByIdNguoiDung(ua.getPrincipal()).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));
        var list = service.findByIdGioHang(gioHang.getId());
        var models = list.stream().map(tranformer::toModel).collect(Collectors.toList());
        var spctIds = models.stream().map(GioHangChiTietModel::getIdSanPhamChiTiet).collect(Collectors.toList());
        var spcts = spctService.findByIdIn(spctIds);
        mapSpctsToModels(models, spcts);

        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    private void mapSpctsToModels(List<GioHangChiTietModel> models, List<SanPhamChiTiet> spcts) {
        if (spcts.isEmpty()) {
            return;
        }
        Map<Long, SanPhamChiTiet> spctMap = spcts.stream().collect(Collectors.toMap(SanPhamChiTiet::getId, Function.identity(), (existing, replacement) -> existing));
        models.forEach(model -> model.setSanPhamChiTiet(spctMap.get(model.getIdSanPhamChiTiet())));

    }


}
