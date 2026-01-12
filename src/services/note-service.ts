 
import { apiClient, handleApiError } from './api-client';
import type {
  NoteResponseDto,
  NoteCreateDto,
  NoteUpdateDto,
  NoteShareDto,
} from './types';

/**
 * Note Service - Not işlemleri için API servisi
 */
export class NoteService {
  /**
   * Yeni not oluşturur
   * POST /api/notes
   */
  static async createNote(data: NoteCreateDto): Promise<NoteResponseDto> {
    try {
      const response = await apiClient.post('notes', {
        json: data,
      }).json<NoteResponseDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Notu günceller (sadece sahip güncelleyebilir)
   * PUT /api/notes/{noteId}
   */
  static async updateNote(noteId: number, data: NoteUpdateDto): Promise<NoteResponseDto> {
    try {
      const response = await apiClient.put(`notes/${noteId}`, {
        json: data,
      }).json<NoteResponseDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Notu siler (sadece sahip silebilir, paylaşımlar da silinir)
   * DELETE /api/notes/{noteId}
   */
  static async deleteNote(noteId: number): Promise<void> {
    try {
      await apiClient.delete(`notes/${noteId}`);
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Belirli bir notu getirir
   * GET /api/notes/{noteId}
   */
  static async getNoteById(noteId: number): Promise<NoteResponseDto> {
    try {
      const response = await apiClient.get(`notes/${noteId}`).json<NoteResponseDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcının sahip olduğu notları getirir
   * GET /api/notes/my-notes
   */
  static async getMyNotes(): Promise<NoteResponseDto[]> {
    try {
      const response = await apiClient.get('notes/my-notes').json<NoteResponseDto[]>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcıyla paylaşılan notları getirir
   * GET /api/notes/shared-with-me
   */
  static async getSharedNotes(): Promise<NoteResponseDto[]> {
    try {
      const response = await apiClient.get('notes/shared-with-me').json<NoteResponseDto[]>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcının erişebildiği tüm notları getirir (sahip + paylaşılan)
   * GET /api/notes/all
   */
  static async getAllAccessibleNotes(): Promise<NoteResponseDto[]> {
    try {
      const response = await apiClient.get('notes/all').json<NoteResponseDto[]>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Notu başka bir kullanıcıyla paylaşır (sadece sahip paylaşabilir)
   * POST /api/notes/{noteId}/share
   */
  static async shareNote(noteId: number, data: NoteShareDto): Promise<NoteResponseDto> {
    try {
      const response = await apiClient.post(`notes/${noteId}/share`, {
        json: data,
      }).json<NoteResponseDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Not paylaşımını kaldırır (sadece sahip kaldırabilir)
   * DELETE /api/notes/{noteId}/share/{targetUserId}
   */
  static async unshareNote(noteId: number, targetUserId: number): Promise<NoteResponseDto> {
    try {
      const response = await apiClient.delete(`notes/${noteId}/share/${targetUserId}`).json<NoteResponseDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }
}
