package org.example.datn.model.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AuthModel {

    @NotBlank(message = "username.required")
    String username;

    @NotBlank(message = "password.required")
    String password;

    String ipAddress;

    boolean rememberMe;
}
