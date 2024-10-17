package org.example.datn.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.request.AuthModel;
import org.example.datn.model.response.AuthInfoModel;
import org.example.datn.processor.UserProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController("AuthApi")
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    @Autowired
    UserProcessor userProcessor;

    @GetMapping("/facebook")
    public AuthInfoModel authByFacebook(@RequestParam("access_token") String token) throws Exception {
        return userProcessor.authByFacebook(token);
    }

    @PostMapping
    public AuthInfoModel auth(@Valid @RequestBody AuthModel model) throws Exception {
        return userProcessor.auth(model);
    }
}
