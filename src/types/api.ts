import { ErrorCode } from "@/lib/errors";

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: ErrorCode;
    details?: unknown;
  };
}

export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiError;

/**
 * Internal service result.
 * Never returned directly to the frontend.
 */
export type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ErrorCode;
    };