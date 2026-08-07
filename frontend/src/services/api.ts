import axios, { AxiosInstance, AxiosError } from 'axios'
import type { ApiResponse, PaginatedResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ token: string; user: any }>>('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('auth_token')
  },

  refreshToken: async () => {
    const response = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<ApiResponse<any>>('/auth/me')
    return response.data
  },
}

// Schools service
export const schoolService = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<any[]>>('/schools')
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/schools/${id}`)
    return response.data
  },

  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/schools', data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put<ApiResponse<any>>(`/schools/${id}`, data)
    return response.data
  },
}

// Curriculum service
export const curriculumService = {
  getAreas: async (grade: number) => {
    const response = await apiClient.get<ApiResponse<any[]>>(`/curriculum/areas?grade=${grade}`)
    return response.data
  },

  getAreaById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/curriculum/areas/${id}`)
    return response.data
  },

  getObjectives: async (areaId: string) => {
    const response = await apiClient.get<ApiResponse<any[]>>(`/curriculum/areas/${areaId}/objectives`)
    return response.data
  },
}

// Lesson Plans service
export const lessonPlanService = {
  getAll: async (filters?: { grade?: number; areaId?: string }) => {
    const response = await apiClient.get<PaginatedResponse<any>>('/lesson-plans', { params: filters })
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/lesson-plans/${id}`)
    return response.data
  },

  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/lesson-plans', data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put<ApiResponse<any>>(`/lesson-plans/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/lesson-plans/${id}`)
  },
}

// Students service
export const studentService = {
  getAll: async (schoolId: string) => {
    const response = await apiClient.get<PaginatedResponse<any>>(`/students?schoolId=${schoolId}`)
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/students/${id}`)
    return response.data
  },

  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/students', data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put<ApiResponse<any>>(`/students/${id}`, data)
    return response.data
  },
}

// Attendance service
export const attendanceService = {
  record: async (data: { studentId: string; date: string; status: string }) => {
    const response = await apiClient.post<ApiResponse<any>>('/attendance', data)
    return response.data
  },

  getByDate: async (date: string, classId: string) => {
    const response = await apiClient.get<ApiResponse<any[]>>(`/attendance?date=${date}&classId=${classId}`)
    return response.data
  },
}

// Assessments service
export const assessmentService = {
  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/assessments', data)
    return response.data
  },

  getByStudent: async (studentId: string) => {
    const response = await apiClient.get<PaginatedResponse<any>>(`/assessments/student/${studentId}`)
    return response.data
  },
}

// AI service
export const aiService = {
  generateLessonPlan: async (context: { grade: number; area: string; topic: string }) => {
    const response = await apiClient.post<ApiResponse<any>>('/ai/generate/lesson-plan', context)
    return response.data
  },

  analyzeStudent: async (studentId: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/ai/analyze/student/${studentId}`)
    return response.data
  },

  recommendActivities: async (params: { grade: number; area: string }) => {
    const response = await apiClient.post<ApiResponse<any[]>>('/ai/recommend/activities', params)
    return response.data
  },
}

// Sync service
export const syncService = {
  getStatus: async () => {
    const response = await apiClient.get<ApiResponse<any>>('/sync/status')
    return response.data
  },

  syncChanges: async (changes: any[]) => {
    const response = await apiClient.post<ApiResponse<any>>('/sync/changes', { changes })
    return response.data
  },

  pullUpdates: async (lastSync: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/sync/pull?since=${lastSync}`)
    return response.data
  },
}

export default apiClient
