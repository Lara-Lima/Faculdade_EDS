package com.hotelJavali.hotelJavali.infrastructure.repositories;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Long> {
    UserData findBySocialId(String socialId);

    UserData findById(long id);

    UserData findByEmail(String email);

    UserData findByDateUserCreate(LocalDate dateUserCreate);
}