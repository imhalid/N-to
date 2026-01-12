package noto.jp.nijen.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteShareDto {
    
    @NotNull(message = "User ID cannot be null")
    private Long userId;
}
