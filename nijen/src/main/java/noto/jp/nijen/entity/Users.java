package noto.jp.nijen.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Users extends BaseEntity {
    private String userName;
    private String email;
    private String passwordHash;
    private String userCode;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> ownedNotes = new ArrayList<>();

    @ManyToMany(mappedBy = "sharedWithUsers")
    private List<Note> sharedNotes = new ArrayList<>();
}
