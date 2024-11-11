package org.example.datn.service;

import lombok.RequiredArgsConstructor;
import org.example.datn.config.VNPayConfig;
import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.HoaDon;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.response.VNPayResponse;
import org.example.datn.utils.VNPayUtil;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPayConfig vnPayConfig;
    public String createVnPayPayment(HoaDon hoaDon, String bankCode, String ipAddress) {
        long amount = hoaDon.getTongTien().longValue() * 100L;
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(hoaDon);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", ipAddress);
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return paymentUrl;
    }

}
