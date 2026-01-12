 
import { apiClient, handleApiError } from './api-client';
import type {
  UserDto,
  UserCreateDto,
  LoginDto,
  LoginResponseDto,
} from './types';

/**
 * User Service - Kullanıcı işlemleri için API servisi
 */
export class UserService {
  /**
   * Yeni kullanıcı kaydı oluşturur
   * POST /api/users
   */
  static async createUser(data: UserCreateDto): Promise<UserDto> {
    try {
      const response = await apiClient.post('users', {
        json: data,
      }).json<UserDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcı girişi yapar
   * POST /api/users/login
   */
  static async login(data: LoginDto): Promise<LoginResponseDto> {
    try {
      const response = await apiClient.post('users/login', {
        json: data,
      }).json<LoginResponseDto>();
      
      // Login başarılı olursa userId'yi localStorage'a kaydet
      if (response.userId) {
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('userCode', response.userCode);
      }
      
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcı çıkışı yapar (localStorage temizlenir)
   */
  static logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userCode');
  }

  /**
   * ID'ye göre kullanıcı getirir
   * GET /api/users/{id}
   */
  static async getUserById(id: number): Promise<UserDto> {
    try {
      const response = await apiClient.get(`users/${id}`).json<UserDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Email'e göre kullanıcı getirir
   * GET /api/users/email/{email}
   */
  static async getUserByEmail(email: string): Promise<UserDto> {
    try {
      const response = await apiClient.get(`users/email/${email}`).json<UserDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcı kodu ile kullanıcı getirir
   * GET /api/users/code/{userCode}
   */
  static async getUserByUserCode(userCode: string): Promise<UserDto> {
    try {
      const response = await apiClient.get(`users/code/${userCode}`).json<UserDto>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Tüm kullanıcıları listeler
   * GET /api/users
   */
  static async getAllUsers(): Promise<UserDto[]> {
    try {
      const response = await apiClient.get('users').json<UserDto[]>();
      return response;
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Kullanıcıyı siler
   * DELETE /api/users/{id}
   */
  static async deleteUser(id: number): Promise<void> {
    try {
      await apiClient.delete(`users/${id}`);
    } catch (error) {
      const errorDetails = await handleApiError(error);
      throw new Error(errorDetails.message);
    }
  }

  /**
   * Mevcut kullanıcının ID'sini döndürür (localStorage'dan)
   */
  static getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number.parseInt(userId) : null;
  }

  /**
   * Kullanıcının login olup olmadığını kontrol eder
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('userId');
  }
}
