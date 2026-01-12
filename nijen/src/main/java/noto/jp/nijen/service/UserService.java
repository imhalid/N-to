package noto.jp.nijen.service;

import lombok.RequiredArgsConstructor;
import noto.jp.nijen.dto.LoginDto;
import noto.jp.nijen.dto.LoginResponseDto;
import noto.jp.nijen.dto.UserCreateDto;
import noto.jp.nijen.dto.UserDto;
import noto.jp.nijen.entity.Users;
import noto.jp.nijen.exception.BadRequestException;
import noto.jp.nijen.exception.ResourceNotFoundException;
import noto.jp.nijen.mapper.NoteMapper;
import noto.jp.nijen.repository.UserRepository;
import noto.jp.nijen.util.PasswordHashUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NoteMapper noteMapper;
    private final PasswordHashUtil passwordHashUtil;

    @Transactional
    public UserDto createUser(UserCreateDto createDto) {
        // Email kontrolü
        if (userRepository.existsByEmail(createDto.getEmail())) {
            throw new BadRequestException("Email already exists: " + createDto.getEmail());
        }
        
        // Username kontrolü
        if (userRepository.existsByUserName(createDto.getUserName())) {
            throw new BadRequestException("Username already exists: " + createDto.getUserName());
        }

        Users user = new Users();
        user.setUserName(createDto.getUserName());
        user.setEmail(createDto.getEmail());
        // Password'ü hashleyerek kaydet
        user.setPasswordHash(passwordHashUtil.hashPassword(createDto.getPassword()));
        user.setUserCode(generateUserCode());

        Users savedUser = userRepository.save(user);
        return noteMapper.toUserDto(savedUser);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        Users user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return noteMapper.toUserDto(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        Users user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return noteMapper.toUserDto(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserByUserCode(String userCode) {
        Users user = userRepository.findByUserCode(userCode)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with user code: " + userCode));
        return noteMapper.toUserDto(user);
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
            .map(noteMapper::toUserDto)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public Users getUserEntityById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginDto loginDto) {
        // Kullanıcıyı email ile bul
        Users user = userRepository.findByEmail(loginDto.getEmail())
            .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        // Şifreyi doğrula
        if (!passwordHashUtil.verifyPassword(loginDto.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid email or password");
        }

        // Login başarılı response döndür
        LoginResponseDto response = new LoginResponseDto();
        response.setUserId(user.getId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        response.setUserCode(user.getUserCode());
        response.setMessage("Login successful");

        return response;
    }

    private String generateUserCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
