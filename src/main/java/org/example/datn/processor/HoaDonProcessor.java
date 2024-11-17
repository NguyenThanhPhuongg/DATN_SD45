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
import org.example.datn.model.response.*;
import org.example.datn.processor.auth.AuthenticationChannelProvider;
import org.example.datn.processor.auth.AuthoritiesValidator;
import org.example.datn.service.*;
import org.example.datn.transformer.HoaDonTransformer;
import org.example.datn.transformer.ProfileTransformer;
import org.example.datn.transformer.UserTransformer;
import org.example.datn.utils.VNPayUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
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
    HoaDonTransformer hoaDonTransformer;

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

    @Autowired
    private PaymentService paymentService;

    public ServiceResult getAll() {
        var list = service.getAll();
        var models = list.stream().map(hoaDon -> {
            var model = toModel(hoaDon);
            var diaChiGiaoHang = diaChiGiaoHangProcessor.findById(hoaDon.getIdDiaChiGiaoHang());
            var phuongThucVanChuyen = phuongThucVanChuyenProcessor.findById(hoaDon.getIdPhuongThucVanChuyen());
            var user = userProcessor.findById(hoaDon.getIdNguoiDung());
            model.setUserModel(user);
            model.setDiaChiGiaoHangModel(diaChiGiaoHang);
            model.setPhuongThucVanChuyenModel(phuongThucVanChuyen);
            return model;
        }).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }


    private HoaDonModel toModel(HoaDon hoaDon) {
        if (hoaDon == null) {
            return null;
        }

        HoaDonModel model = new HoaDonModel();
        model.setId(hoaDon.getId());
        model.setIdNguoiDung(hoaDon.getIdNguoiDung());
        model.setIdDiaChiGiaoHang(hoaDon.getIdDiaChiGiaoHang());
        model.setIdPhuongThucVanChuyen(hoaDon.getIdPhuongThucVanChuyen());
        model.setMa(hoaDon.getMa());
        model.setNgayDatHang(hoaDon.getNgayDatHang());
        model.setNgayThanhToan(hoaDon.getNgayThanhToan());
        model.setTongTien(hoaDon.getTongTien());
        model.setDiemSuDung(hoaDon.getDiemSuDung());
        model.setTrangThai(hoaDon.getTrangThai());
        model.setNgayCapNhat(hoaDon.getNgayCapNhat());
        return model;
    }

    public ServiceResult getById(Long id) {
        var hoaDon = service.findById(id).orElseThrow(() -> new EntityNotFoundException("hoaDon.not.found"));
        var model = hoaDonTransformer.toModel(hoaDon);
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
    hoaDon.setMa(getRandomNumber(8));
    hoaDon.setDiemSuDung(0);
    hoaDon.setNgayTao(LocalDateTime.now());
    hoaDon.setNgayCapNhat(LocalDateTime.now());
    hoaDon.setNguoiTao(ua.getPrincipal());
    hoaDon.setNguoiCapNhat(ua.getPrincipal());
    hoaDon.setNgayDatHang(LocalDateTime.now());
    service.save(hoaDon);

    var phuongThucThanhToan = phuongThucThanhToanService.findById(request.getIdPhuongThucThanhToan())
            .orElseThrow(() -> new EntityNotFoundException("phuongThucThanhToan.not.found"));

    var gioHangChiTiet = gioHangChiTietService.findByIdIn(request.getIdGioHangChiTiet());
    BigDecimal tongTien = BigDecimal.ZERO;
    for (GioHangChiTiet ghct : gioHangChiTiet) {
        HoaDonChiTiet hdct = new HoaDonChiTiet();
        hdct.setIdHoaDon(hoaDon.getId());
        hdct.setIdSanPhamChiTiet(ghct.getIdSanPhamChiTiet());
        hdct.setSoLuong(ghct.getSoLuong());
        hdct.setGia(ghct.getGia());
        BigDecimal giaTien = ghct.getGia().multiply(BigDecimal.valueOf(ghct.getSoLuong()));
        tongTien = tongTien.add(giaTien);
        hdct.setTrangThai(phuongThucThanhToan.getLoai().equals(TypeThanhToan.CASH) ? StatusHoaDon.CHO_XAC_NHAN.getValue() : StatusHoaDon.CHO_THANH_TOAN.getValue());
        hdct.setNgayTao(LocalDateTime.now());
        hdct.setNgayCapNhat(LocalDateTime.now());
        hdct.setNguoiTao(ua.getPrincipal());
        hdct.setNguoiCapNhat(ua.getPrincipal());
        hoaDonChiTietService.save(hdct);
        ghct.setTrangThai(StatusGioHang.DA_DAT_HANG.getValue());
        gioHangChiTietService.save(ghct);
    }

    // Apply voucher discount
    if (request.getGiaTriVoucher() != null) {
        tongTien = tongTien.subtract(request.getGiaTriVoucher());
    }

    hoaDon.setTongTien(tongTien);
    hoaDon.setTrangThai(phuongThucThanhToan.getLoai().equals(TypeThanhToan.CASH) ? StatusHoaDon.CHO_XAC_NHAN.getValue() : StatusHoaDon.CHO_THANH_TOAN.getValue());
    service.save(hoaDon);
    ThanhToan thanhToan = new ThanhToan();
    thanhToan.setIdHoaDon(hoaDon.getId());
    thanhToan.setIdPhuongThucThanhToan(phuongThucThanhToan.getId());
    thanhToan.setSoTien(hoaDon.getTongTien());
    thanhToan.setTrangThai(phuongThucThanhToan.getLoai().equals(TypeThanhToan.CASH) ? StatusThanhToan.CHUA_THANH_TOAN.getValue() : StatusThanhToan.DANG_XU_LY.getValue());
    thanhToanService.save(thanhToan);
    if (phuongThucThanhToan.getLoai().equals(TypeThanhToan.VNPAY)) {
        HttpServletRequest httpRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String ipAddress = VNPayUtil.getIpAddress(httpRequest);
        String vnPayResponse = paymentService.createVnPayPayment(hoaDon, "NCB", ipAddress);
        return new ServiceResult(vnPayResponse, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }
    return new ServiceResult();
}

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public ServiceResult update(Long id, HoaDonRequest request, UserAuthentication ua) {
        HoaDon hoaDon = service.findById(id).orElseThrow(() -> new EntityNotFoundException("hoaDon.not.found"));
        BeanUtils.copyProperties(request, hoaDon);
        hoaDon.setNgayCapNhat(LocalDateTime.now());
        hoaDon.setNguoiCapNhat(ua.getPrincipal());
        service.save(hoaDon);

        return new ServiceResult("Sản phẩm đã được cập nhật thành công", SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }


}
