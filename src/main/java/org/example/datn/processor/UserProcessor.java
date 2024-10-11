package org.example.datn.processor;

import jakarta.persistence.EntityManager;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.datn.repository.UserRepository;
import org.example.datn.service.UserService;
import org.example.datn.transformer.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author hoangKhong
 */
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProcessor {

}
