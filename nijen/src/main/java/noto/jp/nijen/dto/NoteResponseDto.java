package noto.jp.nijen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponseDto {
    private Long id;
    private String title;
    private String content;
    private UserDto owner;
    private List<UserDto> sharedWithUsers;
    private LocalDateTime createdAt;
    private boolean ownerFlag;  // Kullanıcının bu notun sahibi olup olmadığı
}

