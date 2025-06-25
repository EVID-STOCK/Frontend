export interface ApiResponse<T> {
  message: string;
  success: string;
  data: T;
}
