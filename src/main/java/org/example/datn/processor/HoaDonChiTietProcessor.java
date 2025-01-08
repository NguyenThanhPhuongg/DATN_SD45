package org.example.datn.processor;

import org.example.datn.constants.SystemConstant;
import org.example.datn.entity.*;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.HoaDonChiTietRequest;
import org.example.datn.model.response.HoaDonChiTietModel;
import org.example.datn.model.response.HoaDonModel;
import org.example.datn.model.response.SanPhamChiTietModel;
import org.example.datn.model.response.SanPhamModel;
import org.example.datn.service.*;
import org.example.datn.transformer.HoaDonChiTietTransformer;
import org.example.datn.transformer.HoaDonTransformer;
import org.example.datn.transformer.SanPhamChiTietTransformer;
import org.example.datn.transformer.SanPhamTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import javax.persistence.EntityNotFoundException;
import java.util.stream.Collectors;

/**
 * @author hoangKhong
 */
@Component
public class HoaDonChiTietProcessor {

    @Autowired
    HoaDonChiTietService service;
    @Autowired
    HoaDonTransformer hoaDonTransformer;
    @Autowired
    HoaDonService hoaDonService;
    @Autowired
    HoaDonChiTietTransformer hoaDonChiTietTransformer;
    @Autowired
    SanPhamChiTietService sanPhamChiTietService;
    @Autowired
    SanPhamChiTietTransformer sanPhamChiTietTransformer;
    @Autowired
    private SanPhamService sanPhamService;
    @Autowired
    private SanPhamTransformer sanPhamTransformer;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private MauSacService mauSacService;

    @Autowired
    private UserService userService;
    @Autowired
    private ProfileService profileService;
    @Autowired
    SanPhamChiTietProcessor sanPhamChiTietprocessor;

    public ServiceResult getListByStatus(HoaDonChiTietRequest request, UserAuthentication ua) {
        var idHoaDons = hoaDonService.findByIdNguoiDung(ua.getPrincipal()).stream()
                .map(HoaDon::getId)
                .collect(Collectors.toList());
        var hoaDonChiTiets = service.findByIdHoaDonInAndTrangThai(idHoaDons, request.getStatus());
        var models = hoaDonChiTiets.stream()
                .map(hoaDonChiTiet -> {
                    var model = hoaDonChiTietTransformer.toModel(hoaDonChiTiet);
                    sanPhamChiTietService.findById(hoaDonChiTiet.getIdSanPhamChiTiet())
                            .ifPresent(sanPhamChiTiet -> {
                                var spctModel = sanPhamChiTietTransformer.toModel(sanPhamChiTiet);
                                sanPhamService.findById(sanPhamChiTiet.getIdSanPham())
                                        .ifPresent(sanPham -> {
                                            var sanPhamModel = sanPhamTransformer.toModel(sanPham);
                                            spctModel.setSanPhamModel(sanPhamModel);
                                        });
                                var size = sizeService.findById(sanPhamChiTiet.getIdSize()).orElse(null);
                                var mauSac = mauSacService.findById(sanPhamChiTiet.getIdMauSac()).orElse(null);
                                spctModel.setSize(size);
                                spctModel.setMauSac(mauSac);
                                model.setSanPhamChiTietModel(spctModel);

                            });
                    return model;
                })
                .collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    private HoaDonChiTietModel toModel(HoaDonChiTiet hoaDon) {
        if (hoaDon == null) {
            return null;
        }

        HoaDonChiTietModel model = new HoaDonChiTietModel();
        model.setId(hoaDon.getId());
        model.setIdHoaDon(hoaDon.getIdHoaDon());
        model.setGia(hoaDon.getGia());
        model.setSoLuong(hoaDon.getSoLuong());
        model.setIdSanPhamChiTiet(hoaDon.getIdSanPhamChiTiet());
        model.setTrangThai(hoaDon.getTrangThai());
        return model;
    }

    public ServiceResult getAll() {
        var list = service.findAll();
        var models = list.stream().map(hoaDonChiTiet -> {
            var model = toModel(hoaDonChiTiet);
            var sanPhamChiTiet = sanPhamChiTietprocessor.findById(hoaDonChiTiet.getIdSanPhamChiTiet());
            model.setSanPhamChiTietModel(sanPhamChiTiet);
            return model;
        }).collect(Collectors.toList());
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getByIdHoaDon(Long idHoaDon) {
        // Tìm các hóa đơn chi tiết dựa trên idHoaDon
        List<HoaDonChiTiet> hoaDonChiTiets = service.findByIdHoaDon(idHoaDon);

        // Kiểm tra nếu không có dữ liệu
        if (hoaDonChiTiets == null || hoaDonChiTiets.isEmpty()) {
            return new ServiceResult(null, SystemConstant.STATUS_FAIL, "Không tìm thấy hóa đơn chi tiết");
        }

        // Chuyển các hóa đơn chi tiết thành mô hình
        List<HoaDonChiTietModel> models = hoaDonChiTiets.stream()
                .map(hoaDonChiTiet -> {
                    HoaDonChiTietModel model = hoaDonChiTietTransformer.toModel(hoaDonChiTiet);

                    // Tìm sản phẩm chi tiết và thêm vào mô hình
                    sanPhamChiTietService.findById(hoaDonChiTiet.getIdSanPhamChiTiet())
                            .ifPresent(sanPhamChiTiet -> {
                                // Chuyển đổi sản phẩm chi tiết
                                SanPhamChiTietModel spctModel = sanPhamChiTietTransformer.toModel(sanPhamChiTiet);

                                // Lấy thông tin sản phẩm từ sản phẩm chi tiết
                                sanPhamService.findById(sanPhamChiTiet.getIdSanPham())
                                        .ifPresent(sanPham -> {
                                            SanPhamModel sanPhamModel = sanPhamTransformer.toModel(sanPham);
                                            spctModel.setSanPhamModel(sanPhamModel);
                                        });

                                // Thêm thông tin về size và màu sắc của sản phẩm chi tiết
                                Size size = sizeService.findById(sanPhamChiTiet.getIdSize()).orElse(null);
                                MauSac mauSac = mauSacService.findById(sanPhamChiTiet.getIdMauSac()).orElse(null);
                                spctModel.setSize(size);
                                spctModel.setMauSac(mauSac);

                                // Gán vào model hóa đơn chi tiết
                                model.setSanPhamChiTietModel(spctModel);
                            });

                    return model;
                })
                .collect(Collectors.toList());

        // Trả kết quả với danh sách hóa đơn chi tiết
        return new ServiceResult(models, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult getById(Long id) {
        var model = service.findById(id)
                .map(hoaDonChiTiet -> {
                    var m = toModel(hoaDonChiTiet);
                    var sanPhamChiTiet = sanPhamChiTietprocessor.findById(hoaDonChiTiet.getIdSanPhamChiTiet());
                    m.setSanPhamChiTietModel(sanPhamChiTiet);
                    return m;
                })
                .orElseThrow(() -> new EntityNotFoundException("hoaDonChiTiet.not.found"));
        return new ServiceResult(model, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    ///////////////////////////// THỐNG KÊ ///////////////////

    private ServiceResult thongKe(LocalDateTime startDate, LocalDateTime endDate, int status) {
        // Lấy danh sách hóa đơn theo khoảng thời gian và trạng thái
        List<HoaDon> hoaDonList = hoaDonService.findByDateRangeAndStatusAndReturnStatus(startDate, endDate, status);

        // Khởi tạo các biến tính toán tổng doanh thu, số hóa đơn, số lượng sản phẩm, điểm dùng
        BigDecimal totalRevenue = BigDecimal.ZERO;
        int totalInvoices = hoaDonList.size();
        int totalQuantity = 0;
        BigDecimal totalDiemDung = BigDecimal.ZERO;

        // Duyệt qua từng hóa đơn để tính tổng doanh thu và tổng điểm dùng
        for (HoaDon hoaDon : hoaDonList) {
            totalRevenue = totalRevenue.add(hoaDon.getTongTien());  // Tính tổng doanh thu
            if (hoaDon.getDiemSuDung() != null) {
                totalDiemDung = totalDiemDung.add(BigDecimal.valueOf(hoaDon.getDiemSuDung()));  // Tính tổng điểm dùng
            }
        }

        // Lấy chi tiết hóa đơn theo khoảng thời gian và trạng thái
        List<HoaDonChiTiet> hoaDonChiTietList = service.findByDateRange(startDate, endDate, status);

        // Map để lưu trữ doanh thu và số lượng sản phẩm theo id sản phẩm
        Map<Long, BigDecimal> productRevenueMap = new HashMap<>();
        Map<Long, Integer> productQuantityMap = new HashMap<>();

        // Duyệt qua chi tiết hóa đơn để tính doanh thu và số lượng của từng sản phẩm
        for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTietList) {
            totalQuantity += hoaDonChiTiet.getSoLuong();  // Cộng số lượng sản phẩm vào tổng
            Long productDetailId = hoaDonChiTiet.getIdSanPhamChiTiet();
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietService.ById(productDetailId);  // Lấy thông tin sản phẩm chi tiết
            Long productId = sanPhamChiTiet.getIdSanPham();  // Lấy id sản phẩm từ sản phẩm chi tiết

            // Tính doanh thu cho sản phẩm
            BigDecimal revenue = hoaDonChiTiet.getGia().multiply(new BigDecimal(hoaDonChiTiet.getSoLuong()));
            productRevenueMap.put(productId, productRevenueMap.getOrDefault(productId, BigDecimal.ZERO).add(revenue));
            productQuantityMap.put(productId, productQuantityMap.getOrDefault(productId, 0) + hoaDonChiTiet.getSoLuong());
        }

        // Tạo danh sách chi tiết doanh thu và số lượng của các sản phẩm
        List<Map<String, Object>> revenueAndQuantityModels = new ArrayList<>();
        for (Long productId : productRevenueMap.keySet()) {
            BigDecimal productRevenue = productRevenueMap.get(productId);
            int productQuantity = productQuantityMap.get(productId);
            SanPham sanPham = sanPhamService.ById(productId);  // Lấy thông tin sản phẩm

            // Tạo dữ liệu cho sản phẩm
            Map<String, Object> productData = new HashMap<>();
            productData.put("productId", productId);
            productData.put("ten", sanPham.getTen());
            productData.put("ma", sanPham.getMa());
            productData.put("doanhThu", productRevenue);
            productData.put("soLuong", productQuantity);

            revenueAndQuantityModels.add(productData);
        }

        // Map để lưu trữ doanh thu và số hóa đơn của người dùng
        Map<Long, BigDecimal> userRevenueMap = new HashMap<>();
        Map<Long, Integer> userInvoiceCountMap = new HashMap<>();
        Map<Long, Integer> userPointsMap = new HashMap<>(); // Map lưu trữ điểm thưởng của người dùng
        for (HoaDon hoaDon : hoaDonList) {
            Long userId = hoaDon.getIdNguoiDung();
            userRevenueMap.put(userId, userRevenueMap.getOrDefault(userId, BigDecimal.ZERO).add(hoaDon.getTongTien()));  // Tính doanh thu của người dùng
            userInvoiceCountMap.put(userId, userInvoiceCountMap.getOrDefault(userId, 0) + 1);  // Tính số hóa đơn của người dùng
            Integer currentPoints = hoaDon.getDiemSuDung() != null ? hoaDon.getDiemSuDung() : 0;
            userPointsMap.put(userId, userPointsMap.getOrDefault(userId, 0) + currentPoints);
        }

        // Map để lưu trữ doanh thu theo cấp bậc
        Map<String, BigDecimal> revenueByCapBacTotal = new HashMap<>();
        revenueByCapBacTotal.put("BAC", BigDecimal.ZERO);
        revenueByCapBacTotal.put("VANG", BigDecimal.ZERO);
        revenueByCapBacTotal.put("KIM_CUONG", BigDecimal.ZERO);

        // Map để lưu trữ danh sách người dùng theo cấp bậc
        Map<String, List<Map<String, Object>>> revenueByCapBac = new HashMap<>();
        revenueByCapBac.put("BAC", new ArrayList<>());
        revenueByCapBac.put("VANG", new ArrayList<>());
        revenueByCapBac.put("KIM_CUONG", new ArrayList<>());

        // Tạo danh sách doanh thu người dùng
        List<Map<String, Object>> userRevenueList = new ArrayList<>();
        for (Long userId : userRevenueMap.keySet()) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", userId);
            userData.put("doanhThu", userRevenueMap.get(userId));
            userData.put("soLuongHoaDon", userInvoiceCountMap.get(userId));
            userData.put("diemDung", userPointsMap.get(userId));

            User user = userService.ById(userId);  // Lấy thông tin người dùng
            Profile profile = profileService.ById(userId);  // Lấy thông tin hồ sơ người dùng

            userData.put("tenDangNhap", user.getUserName());
            userData.put("hoVaTen", profile.getHoVaTen());
            userData.put("email", profile.getEmail());
            userData.put("capBac", user.getCapBac().name());

            // Thêm người dùng vào danh sách theo cấp bậc
            revenueByCapBac.get(user.getCapBac().name()).add(userData);
            revenueByCapBacTotal.put(user.getCapBac().name(),
                    revenueByCapBacTotal.get(user.getCapBac().name()).add(userRevenueMap.get(userId)));

            userRevenueList.add(userData);
        }

        // Sắp xếp danh sách người dùng theo doanh thu giảm dần
        userRevenueList.sort((a, b) -> ((BigDecimal) b.get("doanhThu")).compareTo((BigDecimal) a.get("doanhThu")));

        // Tạo kết quả trả về
        Map<String, Object> result = new HashMap<>();
        result.put("doanhThu", totalRevenue);
        result.put("soLuongBanRa", totalQuantity);
        result.put("soLuongHoaDon", totalInvoices);
        result.put("diemDung", totalDiemDung);
        result.put("chiTietSanPham", revenueAndQuantityModels);
        result.put("tongHopKhachHang", userRevenueList);
        result.put("thongKeTheoCapBac", revenueByCapBac);
        result.put("tongDoanhThuTheoCapBac", revenueByCapBacTotal);

        // Trả kết quả
        return new ServiceResult(result, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult thongKeOffline(LocalDateTime startDate, LocalDateTime endDate) {
        return thongKe(startDate, endDate, 7);  // Gọi phương thức thongKe với trạng thái offline
    }

    public ServiceResult thongKeOnline(LocalDateTime startDate, LocalDateTime endDate) {
        return thongKe(startDate, endDate, 4);  // Gọi phương thức thongKe với trạng thái online
    }

    public ServiceResult thongKeDonHang(LocalDateTime startDate, LocalDateTime endDate) {
        // Lấy danh sách hóa đơn trong phạm vi ngày
        List<HoaDon> invoices = hoaDonService.findByDateRange(startDate, endDate);

        // Khởi tạo biến đếm cho các trạng thái
        long choXacNhan = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 0).count();
        long choGiaoHang = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 2).count();
        long dangGiaoHang = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 3).count();
        long daGiao = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 4).count();
        long daHuy = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 5).count();
        long taiQuay = invoices.stream().filter(hoaDon -> hoaDon.getTrangThai() == 7).count();

        // Khởi tạo biến đếm cho trạng thái đổi trả
        long YeuCauDoiTraChoXacNhan = invoices.stream()
                .filter(hoaDon -> hoaDon.getTrangThaiDoiTra() != null && hoaDon.getTrangThaiDoiTra() == 0)
                .count();

        long YeuCauDoiTraXacNhan = invoices.stream()
                .filter(hoaDon -> hoaDon.getTrangThaiDoiTra() != null && hoaDon.getTrangThaiDoiTra() == 1)
                .count();

        long YeuCauDoiTraHuy = invoices.stream()
                .filter(hoaDon -> hoaDon.getTrangThaiDoiTra() != null && hoaDon.getTrangThaiDoiTra() == 2)
                .count();

        // Đưa kết quả vào map
        Map<String, Object> result = new HashMap<>();
        result.put("choXacNhan", choXacNhan);
        result.put("choGiaoHang", choGiaoHang);
        result.put("dangGiaoHang", dangGiaoHang);
        result.put("daGiao", daGiao);
        result.put("daHuy", daHuy);
        result.put("taiQuay", taiQuay);
        result.put("YeuCauDoiTraChoXacNhan", YeuCauDoiTraChoXacNhan);
        result.put("YeuCauDoiTraHuy", YeuCauDoiTraHuy);
        result.put("YeuCauDoiTraXacNhan", YeuCauDoiTraXacNhan);

        // Trả về kết quả
        return new ServiceResult(result, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    public ServiceResult thongKeKhachHang(LocalDateTime startDate, LocalDateTime endDate) {
        // Lấy danh sách hóa đơn trong khoảng thời gian và trạng thái là 7
        List<HoaDon> hoaDonList = hoaDonService.findByDateRangeAndStatusAndReturnStatus(startDate, endDate, 7);

        // Bản đồ lưu doanh thu và số lượng hóa đơn theo người dùng
        Map<Long, BigDecimal> userRevenueMap = new HashMap<>();
        Map<Long, Integer> userInvoiceCountMap = new HashMap<>();

        // Tính doanh thu theo từng người dùng
        for (HoaDon hoaDon : hoaDonList) {
            Long userId = hoaDon.getIdNguoiDung();
            userRevenueMap.put(userId, userRevenueMap.getOrDefault(userId, BigDecimal.ZERO).add(hoaDon.getTongTien()));
            userInvoiceCountMap.put(userId, userInvoiceCountMap.getOrDefault(userId, 0) + 1);
        }

        // Tạo danh sách thông tin doanh thu theo khách hàng
        List<Map<String, Object>> userRevenueList = new ArrayList<>();
        Map<String, List<Map<String, Object>>> revenueByCapBac = new HashMap<>();
        revenueByCapBac.put("BAC", new ArrayList<>());
        revenueByCapBac.put("VANG", new ArrayList<>());
        revenueByCapBac.put("KIM_CUONG", new ArrayList<>());

        for (Long userId : userRevenueMap.keySet()) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", userId);
            userData.put("doanhThu", userRevenueMap.get(userId));
            userData.put("soLuongHoaDon", userInvoiceCountMap.get(userId));

            // Lấy thông tin người dùng từ User và Profile
            User user = userService.ById(userId);
            Profile profile = profileService.ById(userId);

            userData.put("tenDangNhap", user.getUserName());
            userData.put("hoVaTen", profile.getHoVaTen());
            userData.put("email", profile.getEmail());
            userData.put("capBac", user.getCapBac().name()); // Lấy cấp bậc của người dùng

            // Phân loại theo cấp bậc
            revenueByCapBac.get(user.getCapBac().name()).add(userData);

            userRevenueList.add(userData);
        }

        // Tạo kết quả trả về
        Map<String, Object> result = new HashMap<>();
        result.put("tongHopKhachHang", userRevenueList);
        result.put("thongKeTheoCapBac", revenueByCapBac);

        return new ServiceResult(result, SystemConstant.STATUS_SUCCESS, SystemConstant.CODE_200);
    }

    //     Thống kê doanh thu theo sản phẩm theo thời gian

}
