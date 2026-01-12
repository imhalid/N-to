package noto.jp.nijen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Note extends BaseEntity {
    private String content;
    private String title;

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private Users owner;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "note_shared_users",
        joinColumns = @JoinColumn(name = "note_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> sharedWithUsers = new ArrayList<>();
    
    public void shareWith(Users user) {
        if (!sharedWithUsers.contains(user)) {
            sharedWithUsers.add(user);
            user.getSharedNotes().add(this);
        }
    }
    
    public void unshareWith(Users user) {
        sharedWithUsers.remove(user);
        user.getSharedNotes().remove(this);
    }
}
