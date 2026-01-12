 
import { useState, useEffect } from 'react';
import { NoteService, UserService, type NoteResponseDto, type UserDto } from '@/services';
import './notes.css';
import Header from '../Layout/Header';

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteResponseDto | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [shareUserCode, setShareUserCode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'my-notes' | 'shared'>('my-notes');

  useEffect(() => {
    loadNotes();
  }, [activeTab]);

  const loadNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = activeTab === 'my-notes' 
        ? await NoteService.getMyNotes()
        : await NoteService.getSharedNotes();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await NoteService.createNote(newNote);
      setNewNote({ title: '', content: '' });
      setShowCreateModal(false);
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!confirm('Are you sure you want to delete this note? All shares will be removed.')) {
      return;
    }
    setError('');
    try {
      await NoteService.deleteNote(noteId);
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
    }
  };

  const handleShareNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) return;
    
    setError('');
    try {
      // Kullanıcı koduna göre kullanıcıyı bul
      const user = await UserService.getUserByUserCode(shareUserCode);
      
      // Notu paylaş
      await NoteService.shareNote(selectedNote.id, { userId: user.id });
      
      setShareUserCode('');
      setShowShareModal(false);
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share note');
    }
  };

  const handleUnshare = async (noteId: number, userId: number) => {
    if (!confirm('Remove this user from shared list?')) {
      return;
    }
    setError('');
    try {
      await NoteService.unshareNote(noteId, userId);
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unshare note');
    }
  };

  const openShareModal = (note: NoteResponseDto) => {
    setSelectedNote(note);
    setShowShareModal(true);
  };

  return (
    <>
      <Header />
      <div className="notes-container">
        <div className="notes-header">
          <h1>MY NOTES</h1>
          <button 
            className="metro-button primary"
            onClick={() => setShowCreateModal(true)}
          >
            + NEW NOTE
          </button>
        </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'my-notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-notes')}
        >
          MY NOTES
        </button>
        <button 
          className={`tab ${activeTab === 'shared' ? 'active' : ''}`}
          onClick={() => setActiveTab('shared')}
        >
          SHARED WITH ME
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet</p>
          <button 
            className="metro-button secondary"
            onClick={() => setShowCreateModal(true)}
          >
            Create your first note
          </button>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-tile">
              <div className="note-header">
                <h3>{note.title}</h3>
                {note.ownerFlag && (
                  <span className="owner-badge">OWNER</span>
                )}
              </div>
              
              <p className="note-content">{note.content}</p>
              
              <div className="note-meta">
                <span className="note-owner">by {note.owner.userName}</span>
                {note.sharedWithUsers.length > 0 && (
                  <span className="shared-count">
                    Shared with {note.sharedWithUsers.length}
                  </span>
                )}
              </div>

              {note.ownerFlag && (
                <div className="note-actions">
                  <button 
                    className="action-btn share"
                    onClick={() => openShareModal(note)}
                  >
                    SHARE
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    DELETE
                  </button>
                </div>
              )}

              {note.sharedWithUsers.length > 0 && note.ownerFlag && (
                <div className="shared-users">
                  <p className="shared-title">SHARED WITH:</p>
                  {note.sharedWithUsers.map((user) => (
                    <div key={user.id} className="shared-user">
                      <span>{user.userName} ({user.userCode})</span>
                      <button 
                        className="unshare-btn"
                        onClick={() => handleUnshare(note.id, user.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>CREATE NEW NOTE</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateNote} className="modal-form">
              <div className="form-group">
                <label>TITLE</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  placeholder="Enter note title"
                  required
                  maxLength={200}
                />
              </div>

              <div className="form-group">
                <label>CONTENT</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  placeholder="Enter note content"
                  required
                  rows={8}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="metro-button secondary" onClick={() => setShowCreateModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="metro-button primary">
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Note Modal */}
      {showShareModal && selectedNote && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>SHARE NOTE</h2>
              <button 
                className="close-btn"
                onClick={() => setShowShareModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-info">
              <p><strong>{selectedNote.title}</strong></p>
              <p className="note-preview">{selectedNote.content.substring(0, 100)}...</p>
            </div>

            <form onSubmit={handleShareNote} className="modal-form">
              <div className="form-group">
                <label>USER CODE</label>
                <input
                  type="text"
                  value={shareUserCode}
                  onChange={(e) => setShareUserCode(e.target.value.toUpperCase())}
                  placeholder="Enter user code (e.g., ABC12345)"
                  required
                  maxLength={8}
                />
                <small>Enter the user code of the person you want to share with</small>
              </div>

              <div className="modal-actions">
                <button type="button" className="metro-button secondary" onClick={() => setShowShareModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="metro-button primary">
                  SHARE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
