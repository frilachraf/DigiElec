/**
 * API Client for fetching data from http://localhost:8000/api/
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      })

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`[API Client] GET ${endpoint} failed:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      })

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`[API Client] POST ${endpoint} failed:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      })

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`[API Client] PUT ${endpoint} failed:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      })

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`[API Client] DELETE ${endpoint} failed:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export default ApiClient
