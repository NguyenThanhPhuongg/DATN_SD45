package org.example.datn.processor;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.datn.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author hoangKhong
 */
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProfileProcessor {

    @Autowired
    ProfileService profileService;

    public ProfileProcessor(ProfileService profileService) {
        this.profileService = profileService;
    }
}
