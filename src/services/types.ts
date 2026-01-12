 
export interface UserDto {
  id: number;
  userName: string;
  email: string;
  userCode: string;
  createdAt: string;
}

export interface UserCreateDto {
  userName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  userId: number;
  userName: string;
  email: string;
  userCode: string;
  message: string;
}

export interface NoteCreateDto {
  title: string;
  content: string;
}

export interface NoteUpdateDto {
  title: string;
  content: string;
}

export interface NoteShareDto {
  userId: number;
}

export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  owner: UserDto;
  sharedWithUsers: UserDto[];
  createdAt: string;
  ownerFlag: boolean;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
