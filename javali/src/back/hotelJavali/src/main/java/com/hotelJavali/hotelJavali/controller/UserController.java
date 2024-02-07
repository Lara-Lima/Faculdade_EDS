package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.UserLoginService;
import com.hotelJavali.hotelJavali.domain.UserService;
import com.hotelJavali.hotelJavali.domain.models.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/user", consumes = "application/json", produces = "application/json")
public class UserController {

    private final UserService service;
    private final UserLoginService loginService;

    @GetMapping("/all")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/UsuarioPorMes")
    public ResponseEntity<List<Integer>> quantidadeCadastrosAnoAnterior() {
        List<Integer> usuarioPorMes = service.quantidadeCadastrosAnoAnterior();
        return ResponseEntity.ok(usuarioPorMes);
    }

    @GetMapping("/{socialId}")
    public ResponseEntity<UserModel> getUserBySocialId(@PathVariable String socialId) {
        try {
            UserModel model = service.findBySocialId(socialId);
            if (nonNull(model)) {
                return ResponseEntity.ok(model);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/login/{email}")
    public ResponseEntity<UserModel> findByEmail(@PathVariable String email) {

        return ResponseEntity.ok(loginService.findByEmailUser(email));
    }

    @PostMapping("/create")
    public ResponseEntity<UserModel> createUserData(@RequestBody UserModel userModel) {
        var model = service.save(userModel);
        if (isNull(model)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.created(URI.create("/user/create")).body(model);
    }

    @DeleteMapping("/{socialId}")
    public ResponseEntity<Void> deleteUserData(@PathVariable String userId) {
        service.deleteById(userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<UserModel> updateUserDto(@RequestBody UpdateUserDto updateuserDto,
            @PathVariable Long id) {
        UserModel user = service.updateUserData(updateuserDto, id);
        if (isNull(user)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/inactive/{id}")
    public ResponseEntity<UserModel> inactiveUserData(@PathVariable Long id) {
        UserModel user = service.inactiveUserData(id);
        if (isNull(user)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(user);
    }
}