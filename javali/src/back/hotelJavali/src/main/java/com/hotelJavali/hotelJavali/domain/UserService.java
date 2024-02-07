package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.controller.UpdateUserDto;
import com.hotelJavali.hotelJavali.domain.converters.UserConverter;
import com.hotelJavali.hotelJavali.domain.models.UserModel;
import com.hotelJavali.hotelJavali.domain.models.UserPasswordModel;
import com.hotelJavali.hotelJavali.domain.validations.UserValidations;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;
import com.hotelJavali.hotelJavali.infrastructure.repositories.UserDataRepository;
import com.hotelJavali.hotelJavali.utils.PasswordUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.apache.logging.log4j.util.Strings.isNotBlank;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserDataRepository repository;
    private final UserConverter converter;
    private final UserValidations validations;

    public UserModel findBySocialId(String socialId) {
        UserData userData = repository.findBySocialId(socialId);
        return converter.convert(userData);
    }

    public UserData findById(Long id) {
        UserData userData = repository.findById(id).orElse(null);
        return userData;
    }

    public List<UserModel> findAll() {
        List<UserData> userData = repository.findAll();
        return converter.convertModel(userData);
    }

    public UserModel save(UserModel request) {
        try {
            UserData userData = repository.findBySocialId(request.getSocialId());

            if (isNull(userData)) {
                return createUser(request);
            }

            return converter.convert(userData);
        } catch (Exception exception) {
            log.error("Erro ao salvar Usuário", exception);
            return null;
        }
    }

    public UserModel createUser(UserModel request) {
        UserData entity = converter.convert(request);
        log.info("salvo com sucesso!");
        return converter.convert(repository.save(entity));
    }

    public void deleteById(String socialId) {
        UserData userData = repository.findBySocialId(socialId);

        if (nonNull(userData)) {
            repository.delete(userData);
        }
    }

    @Transactional
    public UserModel updateUserData(UpdateUserDto updateuserDto, Long id) {
        Optional<UserData> existingUserOptional = repository.findById(id);

        UserData existingUser = existingUserOptional.get();
        existingUser.setName(updateuserDto.getName());
        existingUser.setPhone(updateuserDto.getPhone());
        existingUser.setBirthDate(updateuserDto.getBirthDate());
        existingUser.getAddress().setCep(updateuserDto.getAddress().getCep());
        existingUser.getAddress().setStreet(updateuserDto.getAddress().getStreet());
        existingUser.getAddress().setAddressNumber(updateuserDto.getAddress().getAddressNumber());
        existingUser.getAddress().setNeighborhood(updateuserDto.getAddress().getNeighborhood());
        existingUser.getAddress().setCity(updateuserDto.getAddress().getCity());
        existingUser.getAddress().setCountryState(updateuserDto.getAddress().getCountryState());

        UserData userData = repository.save(existingUser);
        return converter.convert(userData);
    }

    @Transactional
    public UserModel inactiveUserData(Long id) {
        UserData userData = repository.findById(id).orElse(null);

        if (!isNull(userData)) {
            userData.setActive(false);

        }

        UserData userDataN = repository.save(userData);
        return converter.convert(userDataN);
    }

    public List<Integer> cadastroAnual() {
        List<Integer> cadastroAnual = repository
                .findAll().stream().map(UserData::getDateUserCreate).map(data -> data.getYear())
                .collect(Collectors.toList());
        return cadastroAnual;
    }

    public Integer quantidadeCadastroUsuarioMes(Long mes) {
        long count = repository.findAll()
                .stream()
                .filter(e -> e.getDateUserCreate().getMonth().getValue() == mes)
                .count();

        return Math.toIntExact(count);
    }

    public List<Integer> quantidadeCadastrosAnoAnterior() {
        List<Integer> quantidadeCadastrosAnoAnterior = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            quantidadeCadastrosAnoAnterior.add(quantidadeCadastroUsuarioMes((long) i));
        }

        return quantidadeCadastrosAnoAnterior;
    }
}
