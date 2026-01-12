package noto.jp.nijen.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordHashUtil {

    private final PasswordEncoder passwordEncoder;

    public PasswordHashUtil() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Şifreyi hashler (encode eder)
     * @param rawPassword Ham şifre
     * @return Hashlenmiş şifre
     */
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * Şifreyi doğrular (karşılaştırır)
     * @param rawPassword Kullanıcının girdiği ham şifre
     * @param hashedPassword Database'de saklanan hashlenmiş şifre
     * @return Şifre eşleşirse true, aksi halde false
     */
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
}
