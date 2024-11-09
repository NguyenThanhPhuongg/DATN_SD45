package org.example.datn.repository;

import feign.Param;
import org.example.datn.entity.Profile;
import org.example.datn.entity.SanPhamChiTiet;
import org.example.datn.entity.User;
import org.example.datn.model.enums.UserRoles;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KhachHangRepository extends JpaRepository<Profile, Long> {
    @Query("SELECT u FROM User u JOIN Profile p ON u.id = p.userId " +
            "WHERE p.phone LIKE %:sdt% " +
            "AND (:role IS NULL OR u.role = :role)")
    Page<User> findByHoVaTenAndRole(@Param("hoVaTen") String hoVaTen,
                                    @Param("sdt") String sdt,
                                    @Param("role") UserRoles role,
                                    Pageable pageable);

}
