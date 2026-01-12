package noto.jp.nijen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import noto.jp.nijen.dto.NoteCreateDto;
import noto.jp.nijen.dto.NoteResponseDto;
import noto.jp.nijen.dto.NoteShareDto;
import noto.jp.nijen.dto.NoteUpdateDto;
import noto.jp.nijen.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    // Not oluştur
    @PostMapping
    public ResponseEntity<NoteResponseDto> createNote(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody NoteCreateDto createDto) {
        NoteResponseDto createdNote = noteService.createNote(userId, createDto);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    // Not güncelle
    @PutMapping("/{noteId}")
    public ResponseEntity<NoteResponseDto> updateNote(
            @PathVariable Long noteId,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody NoteUpdateDto updateDto) {
        NoteResponseDto updatedNote = noteService.updateNote(noteId, userId, updateDto);
        return ResponseEntity.ok(updatedNote);
    }

    // Not sil
    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNote(
            @PathVariable Long noteId,
            @RequestHeader("X-User-Id") Long userId) {
        noteService.deleteNote(noteId, userId);
        return ResponseEntity.noContent().build();
    }

    // Belirli bir notu getir
    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResponseDto> getNoteById(
            @PathVariable Long noteId,
            @RequestHeader("X-User-Id") Long userId) {
        NoteResponseDto note = noteService.getNoteById(noteId, userId);
        return ResponseEntity.ok(note);
    }

    // Kullanıcının sahip olduğu notları getir
    @GetMapping("/my-notes")
    public ResponseEntity<List<NoteResponseDto>> getMyNotes(
            @RequestHeader("X-User-Id") Long userId) {
        List<NoteResponseDto> notes = noteService.getUserOwnedNotes(userId);
        return ResponseEntity.ok(notes);
    }

    // Kullanıcıyla paylaşılan notları getir
    @GetMapping("/shared-with-me")
    public ResponseEntity<List<NoteResponseDto>> getSharedNotes(
            @RequestHeader("X-User-Id") Long userId) {
        List<NoteResponseDto> notes = noteService.getUserSharedNotes(userId);
        return ResponseEntity.ok(notes);
    }

    // Kullanıcının erişebildiği tüm notları getir (sahip + paylaşılan)
    @GetMapping("/all")
    public ResponseEntity<List<NoteResponseDto>> getAllAccessibleNotes(
            @RequestHeader("X-User-Id") Long userId) {
        List<NoteResponseDto> notes = noteService.getAllAccessibleNotes(userId);
        return ResponseEntity.ok(notes);
    }

    // Notu paylaş
    @PostMapping("/{noteId}/share")
    public ResponseEntity<NoteResponseDto> shareNote(
            @PathVariable Long noteId,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody NoteShareDto shareDto) {
        NoteResponseDto sharedNote = noteService.shareNote(noteId, userId, shareDto.getUserId());
        return ResponseEntity.ok(sharedNote);
    }

    // Paylaşımı kaldır
    @DeleteMapping("/{noteId}/share/{targetUserId}")
    public ResponseEntity<NoteResponseDto> unshareNote(
            @PathVariable Long noteId,
            @PathVariable Long targetUserId,
            @RequestHeader("X-User-Id") Long userId) {
        NoteResponseDto unsharedNote = noteService.unshareNote(noteId, userId, targetUserId);
        return ResponseEntity.ok(unsharedNote);
    }
}
