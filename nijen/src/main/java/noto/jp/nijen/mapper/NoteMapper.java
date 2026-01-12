package noto.jp.nijen.mapper;

import noto.jp.nijen.dto.NoteResponseDto;
import noto.jp.nijen.dto.UserDto;
import noto.jp.nijen.entity.Note;
import noto.jp.nijen.entity.Users;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class NoteMapper {

    public UserDto toUserDto(Users user) {
        if (user == null) return null;
        
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());
        dto.setUserCode(user.getUserCode());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    public NoteResponseDto toNoteResponseDto(Note note, Long currentUserId) {
        if (note == null) return null;
        
        NoteResponseDto dto = new NoteResponseDto();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        dto.setOwner(toUserDto(note.getOwner()));
        dto.setSharedWithUsers(
            note.getSharedWithUsers().stream()
                .map(this::toUserDto)
                .collect(Collectors.toList())
        );
        dto.setCreatedAt(note.getCreatedAt());
        dto.setOwnerFlag(note.getOwner().getId().equals(currentUserId));
        
        return dto;
    }
}
