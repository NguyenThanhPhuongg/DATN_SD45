package org.example.datn.processor;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.ServiceResult;
import org.example.datn.model.UserAuthentication;
import org.example.datn.model.request.ProfileRequest;
import org.example.datn.service.ProfileService;
import org.example.datn.service.UserService;
import org.example.datn.transformer.ProfileTransformer;
import org.example.datn.transformer.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

/**
 * @author hoangKhong
 */
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProfileProcessor {

    ProfileService profileService;
    UserService userService;
    ProfileTransformer transformer;

    public ProfileProcessor(ProfileService profileService, UserService userService, ProfileTransformer profileTransformer) {
        this.profileService = profileService;
        this.userService = userService;
        this.transformer = profileTransformer;
    }

    @Transactional
    public ServiceResult update(ProfileRequest request, UserAuthentication ua) {
        Long userId = ua.getPrincipal();
        var user = userService.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        var profile = profileService.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found for user ID: " + userId));
        profile.setHoVaTen(request.getHoVaTen());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setCccd(request.getCccd());
        profile.setGioiTinh(request.getGioiTinh());
        profile.setNgaySinh(request.getNgaySinh());
        profileService.save(profile);
        if (!user.getUserName().equals(profile.getEmail())) {
            user.setUserName(profile.getEmail());
            userService.save(user);
        }

        return new ServiceResult();
    }

}
