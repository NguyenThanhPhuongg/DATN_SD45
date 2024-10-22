package org.example.datn.processor;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.StringUtils;
import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.*;
import org.example.datn.exception.*;
import org.example.datn.jwt.JwtGenerator;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.enums.*;
import org.example.datn.model.request.AuthModel;
import org.example.datn.model.request.ChangePasswordModel;
import org.example.datn.model.request.HoaDonRequest;
import org.example.datn.model.request.RegisterModel;
import org.example.datn.model.response.AuthInfoModel;
import org.example.datn.model.response.ProfileModel;
import org.example.datn.model.response.SessionModel;
import org.example.datn.model.response.UserModel;
import org.example.datn.processor.auth.AuthenticationChannelProvider;
import org.example.datn.processor.auth.AuthoritiesValidator;
import org.example.datn.service.*;
import org.example.datn.transformer.HoaDonTransformer;
import org.example.datn.transformer.ProfileTransformer;
import org.example.datn.transformer.UserTransformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static org.example.datn.utils.CalendarUtil.DateTimeUtils.now;

/**
 * @author hoangKhong
 */
@Component
public class HoaDonProcessor {
    @Autowired
    HoaDonService service;

    @Autowired
    HoaDonTransformer transformer;

    @Autowired
    DiaChiGiaoHangProcessor diaChiGiaoHangProcessor;

    @Autowired
    PhuongThucVanChuyenProcessor phuongThucVanChuyenProcessor;

    @Autowired
    UserProcessor userProcessor;

    @Autowired
    GioHangChiTietService gioHangChiTietService;

    @Autowired
    GioHangService gioHangService;

    @Autowired
    HoaDonChiTietService hoaDonChiTietService;

    public ServiceResult getAll() {
        var list = service.getAll();
        var models = list.stream().map(transformer::toModel).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        var hoaDon = service.findById(id).orElseThrow(() -> new EntityNotFoundException("hoaDon.not.found"));
        var model = transformer.toModel(hoaDon);
        var diaChiGiaoHang = diaChiGiaoHangProcessor.findById(hoaDon.getIdDiaChiGiaoHang());
        var phuongThucVanChuyen = phuongThucVanChuyenProcessor.findById(hoaDon.getIdPhuongThucVanChuyen());
        var user = userProcessor.findById(hoaDon.getIdDiaChiGiaoHang());
        model.setUserModel(user);
        model.setDiaChiGiaoHangModel(diaChiGiaoHang);
        model.setPhuongThucVanChuyenModel(phuongThucVanChuyen);
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    @Transactional(rollbackOn = Exception.class)
    public ServiceResult save(HoaDonRequest request, UserAuthentication ua) {

        HoaDon hoaDon = new HoaDon();
        hoaDon.setIdNguoiDung(ua.getPrincipal());
        hoaDon.setIdDiaChiGiaoHang(request.getIdDiaChiGiaoHang());
        hoaDon.setIdPhuongThucVanChuyen(request.getIdPhuongThucVanChuyen());
        hoaDon.setDiemSuDung(0);
        hoaDon.setTrangThai(StatusHoaDon.CHO_XU_LY.getValue());
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setNguoiTao(ua.getPrincipal());

        var gioHang = gioHangService.findByIdNguoiDung(ua.getPrincipal());
        var gioHangChiTiet = gioHangChiTietService.findByIdGioHang(gioHang.get().getId());
        BigDecimal tongTien = BigDecimal.ZERO;
        for (GioHangChiTiet ghct: gioHangChiTiet){
            HoaDonChiTiet hdct = new HoaDonChiTiet();
            hdct.setIdHoaDon(hoaDon.getId());
            hdct.setIdSanPhamChiTiet(ghct.getIdSanPhamChiTiet());
            hdct.setSoLuong(ghct.getSoLuong());
            hdct.setGia(ghct.getGia());
            tongTien = tongTien.add(ghct.getGia());
            hdct.setNgayTao(LocalDateTime.now());
            hdct.setNguoiTao(ua.getPrincipal());
            hoaDonChiTietService.save(hdct);
        }
        hoaDon.setTongTien(tongTien);
        service.save(hoaDon);

        return new ServiceResult();

    }

}
