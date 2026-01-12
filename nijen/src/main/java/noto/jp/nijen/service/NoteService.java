package noto.jp.nijen.service;

import lombok.RequiredArgsConstructor;
import noto.jp.nijen.dto.NoteCreateDto;
import noto.jp.nijen.dto.NoteResponseDto;
import noto.jp.nijen.dto.NoteUpdateDto;
import noto.jp.nijen.entity.Note;
import noto.jp.nijen.entity.Users;
import noto.jp.nijen.exception.ResourceNotFoundException;
import noto.jp.nijen.exception.UnauthorizedException;
import noto.jp.nijen.mapper.NoteMapper;
import noto.jp.nijen.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserService userService;
    private final NoteMapper noteMapper;

    @Transactional
    public NoteResponseDto createNote(Long ownerId, NoteCreateDto createDto) {
        Users owner = userService.getUserEntityById(ownerId);

        Note note = new Note();
        note.setTitle(createDto.getTitle());
        note.setContent(createDto.getContent());
        note.setOwner(owner);

        Note savedNote = noteRepository.save(note);
        return noteMapper.toNoteResponseDto(savedNote, ownerId);
    }

    @Transactional
    public NoteResponseDto updateNote(Long noteId, Long userId, NoteUpdateDto updateDto) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + noteId));

        // Sadece sahip güncelleyebilir
        if (!note.getOwner().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this note");
        }

        note.setTitle(updateDto.getTitle());
        note.setContent(updateDto.getContent());

        Note updatedNote = noteRepository.save(note);
        return noteMapper.toNoteResponseDto(updatedNote, userId);
    }

    @Transactional
    public void deleteNote(Long noteId, Long userId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + noteId));

        // Sadece sahip silebilir
        if (!note.getOwner().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this note");
        }

        // Cascade ile paylaşımlar da silinecek
        noteRepository.delete(note);
    }

    @Transactional(readOnly = true)
    public NoteResponseDto getNoteById(Long noteId, Long userId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + noteId));

        // Kullanıcının bu nota erişim yetkisi var mı?
        boolean hasAccess = note.getOwner().getId().equals(userId) ||
            note.getSharedWithUsers().stream()
                .anyMatch(user -> user.getId().equals(userId));

        if (!hasAccess) {
            throw new UnauthorizedException("You don't have access to this note");
        }

        return noteMapper.toNoteResponseDto(note, userId);
    }

    @Transactional(readOnly = true)
    public List<NoteResponseDto> getUserOwnedNotes(Long userId) {
        List<Note> notes = noteRepository.findByOwnerId(userId);
        return notes.stream()
            .map(note -> noteMapper.toNoteResponseDto(note, userId))
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NoteResponseDto> getUserSharedNotes(Long userId) {
        List<Note> notes = noteRepository.findNotesSharedWithUser(userId);
        return notes.stream()
            .map(note -> noteMapper.toNoteResponseDto(note, userId))
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NoteResponseDto> getAllAccessibleNotes(Long userId) {
        List<Note> notes = noteRepository.findAllAccessibleNotes(userId);
        return notes.stream()
            .map(note -> noteMapper.toNoteResponseDto(note, userId))
            .collect(Collectors.toList());
    }

    @Transactional
    public NoteResponseDto shareNote(Long noteId, Long ownerId, Long targetUserId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + noteId));

        // Sadece sahip paylaşabilir
        if (!note.getOwner().getId().equals(ownerId)) {
            throw new UnauthorizedException("You are not authorized to share this note");
        }

        // Hedef kullanıcıyı bul
        Users targetUser = userService.getUserEntityById(targetUserId);

        // Kendisiyle paylaşmaya çalışıyor mu?
        if (ownerId.equals(targetUserId)) {
            throw new UnauthorizedException("You cannot share a note with yourself");
        }

        // Not zaten paylaşılmış mı?
        boolean alreadyShared = note.getSharedWithUsers().stream()
            .anyMatch(user -> user.getId().equals(targetUserId));

        if (alreadyShared) {
            throw new UnauthorizedException("Note is already shared with this user");
        }

        // Paylaş
        note.shareWith(targetUser);
        Note savedNote = noteRepository.save(note);

        return noteMapper.toNoteResponseDto(savedNote, ownerId);
    }

    @Transactional
    public NoteResponseDto unshareNote(Long noteId, Long ownerId, Long targetUserId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + noteId));

        // Sadece sahip paylaşımı kaldırabilir
        if (!note.getOwner().getId().equals(ownerId)) {
            throw new UnauthorizedException("You are not authorized to unshare this note");
        }

        // Hedef kullanıcıyı bul
        Users targetUser = userService.getUserEntityById(targetUserId);

        // Paylaşımı kaldır
        note.unshareWith(targetUser);
        Note savedNote = noteRepository.save(note);

        return noteMapper.toNoteResponseDto(savedNote, ownerId);
    }
}
