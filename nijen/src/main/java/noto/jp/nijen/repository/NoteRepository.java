package noto.jp.nijen.repository;

import noto.jp.nijen.entity.Note;
import noto.jp.nijen.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    
    // Kullanıcının sahip olduğu notları getir
    List<Note> findByOwner(Users owner);
    
    // Kullanıcının sahip olduğu notları ID ile getir
    List<Note> findByOwnerId(Long ownerId);
    
    // Kullanıcıyla paylaşılan notları getir
    @Query("SELECT n FROM Note n JOIN n.sharedWithUsers u WHERE u.id = :userId")
    List<Note> findNotesSharedWithUser(@Param("userId") Long userId);
    
    // Kullanıcının erişebildiği tüm notları getir (sahip olduğu + paylaşılan)
    @Query("SELECT DISTINCT n FROM Note n WHERE n.owner.id = :userId OR :userId IN (SELECT u.id FROM n.sharedWithUsers u)")
    List<Note> findAllAccessibleNotes(@Param("userId") Long userId);
}
