package org.example.datn.repository;

import org.example.datn.entity.User;
import org.example.datn.model.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author hoangKhong
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    Optional<User> findByUserNameAndStatus(String username, UserStatus userStatus);

    Optional<User> findByIdAndStatus(Long id, UserStatus userStatus);

    List<User> findByIdIn(List<Long> ids);

    List<User> findAllByStatus(UserStatus status);

    boolean existsByUserName(String username);

}
