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
import java.util.*;
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

    @Autowired
    PhuongThucThanhToanService phuongThucThanhToanService;

    @Autowired
    ThanhToanService thanhToanService;

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
        hoaDon.setNgayTao(new Date());
        hoaDon.setNguoiTao(ua.getPrincipal());

        var gioHang = gioHangService.findByIdNguoiDung(ua.getPrincipal()).orElseThrow(() -> new EntityNotFoundException("user.not.found"));
        var gioHangChiTiet = gioHangChiTietService.findByIdGioHang(gioHang.getId());
        BigDecimal tongTien = BigDecimal.ZERO;
        for (GioHangChiTiet ghct: gioHangChiTiet){
            HoaDonChiTiet hdct = new HoaDonChiTiet();
            hdct.setIdHoaDon(hoaDon.getId());
            hdct.setIdSanPhamChiTiet(ghct.getIdSanPhamChiTiet());
            hdct.setSoLuong(ghct.getSoLuong());
            hdct.setGia(ghct.getGia());
            tongTien = tongTien.add(ghct.getGia());
            hdct.setNgayTao(new Date());
            hdct.setNguoiTao(ua.getPrincipal());
            hoaDonChiTietService.save(hdct);
        }
        hoaDon.setTongTien(tongTien);
        service.save(hoaDon);
        var phuongThucThanhToan = phuongThucThanhToanService.findById(request.getIdPhuongThucThanhToan())
                .orElseThrow(() -> new EntityNotFoundException("phuongThucThanhToan.not.found"));
        if (phuongThucThanhToan.getLoai().equals(TypeThanhToan.COD)){
            ThanhToan thanhToan = new ThanhToan();
            thanhToan.setIdHoaDon(hoaDon.getId());
            thanhToan.setIdPhuongThucThanhToan(phuongThucThanhToan.getId());
            thanhToan.setSoTien(hoaDon.getTongTien());
            thanhToan.setTrangThai(StatusThanhToan.CHUA_THANH_TOAN.getValue());
        }
//        else if (phuongThucThanhToan.getLoai().equals(TypeThanhToan.VNPAY)) {
//            // Tạo bản ghi thanh toán trước khi chuyển hướng
//            ThanhToan thanhToan = new ThanhToan();
//            thanhToan.setIdHoaDon(hoaDon.getId());
//            thanhToan.setIdPhuongThucThanhToan(phuongThucThanhToan.getId());
//            thanhToan.setSoTien(hoaDon.getTongTien());
//            thanhToan.setTrangThai(StatusThanhToan.CHUA_THANH_TOAN.getValue());
//            thanhToanService.save(thanhToan);
//
//            // Xử lý thanh toán qua VNPAY
//            String vnpayUrl = createVnpayRequest(hoaDon, tongTien, ua);
//            return new ServiceResult(vnpayUrl, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
//        }
        return new ServiceResult();

    }

//    private String createVnpayRequest(HoaDon hoaDon, BigDecimal tongTien, UserAuthentication ua) {
//
//    }

}
