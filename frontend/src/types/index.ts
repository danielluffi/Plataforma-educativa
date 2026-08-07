// User types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  schoolId?: string
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'director'

// School types
export interface School {
  id: string
  name: string
  code: string
  level: SchoolLevel
  address: string
  city: string
  department: string
  createdAt: string
}

export type SchoolLevel = 'inicial' | 'primario' | 'both'

// Curriculum types (DCP - Diseño Curricular Provincial)
export interface CurriculumArea {
  id: string
  name: string
  description: string
  grade: number
  objectives: LearningObjective[]
  contents: Content[]
}

export interface LearningObjective {
  id: string
  code: string
  description: string
  indicators: string[]
}

export interface Content {
  id: string
  title: string
  description: string
  type: ContentType
  resources: Resource[]
}

export type ContentType = 'conceptual' | 'procedimental' | 'actitudinal'

// Planning types
export interface LessonPlan {
  id: string
  title: string
  area: CurriculumArea
  grade: number
  duration: number // in minutes
  objectives: string[]
  activities: Activity[]
  resources: Resource[]
  evaluation: EvaluationCriteria
  teacherId: string
  schoolId: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  title: string
  description: string
  duration: number
  type: ActivityType
  instructions: string
  materials: string[]
}

export type ActivityType = 'inicio' | 'desarrollo' | 'cierre'

export interface Resource {
  id: string
  title: string
  type: ResourceType
  url?: string
  file?: FileAttachment
  description?: string
}

export type ResourceType = 'document' | 'video' | 'image' | 'audio' | 'interactive' | 'link'

export interface FileAttachment {
  id: string
  name: string
  size: number
  mimeType: string
  url: string
}

// Student tracking types
export interface Student {
  id: string
  name: string
  firstName: string
  lastName: string
  dateOfBirth: string
  grade: number
  section: string
  schoolId: string
  parentId?: string
  photoUrl?: string
  createdAt: string
}

export interface Attendance {
  id: string
  studentId: string
  date: string
  status: AttendanceStatus
  justification?: string
  recordedBy: string
  createdAt: string
}

export type AttendanceStatus = 'presente' | 'ausente' | 'tarde' | 'justificada'

export interface Assessment {
  id: string
  studentId: string
  lessonPlanId: string
  type: AssessmentType
  score?: number
  maxScore?: number
  feedback?: string
  criteria: AssessmentCriteria[]
  recordedBy: string
  createdAt: string
}

export type AssessmentType = 'diagnostica' | 'formativa' | 'sumativa'

export interface AssessmentCriteria {
  criterion: string
  level: PerformanceLevel
  comments?: string
}

export type PerformanceLevel = 'excelente' | 'satisfactorio' | 'en_proceso' | 'insuficiente'

// Sync types
export interface SyncStatus {
  lastSync: string | null
  pendingChanges: number
  isOnline: boolean
  syncing: boolean
  error?: string
}

export interface PendingChange {
  id: string
  type: ChangeType
  data: any
  timestamp: string
  synced: boolean
}

export type ChangeType = 'create' | 'update' | 'delete'

// AI types
export interface AIRecommendation {
  id: string
  type: RecommendationType
  title: string
  description: string
  confidence: number
  metadata: Record<string, any>
}

export type RecommendationType = 'activity' | 'resource' | 'intervention' | 'content'

export interface AIAnalysis {
  studentId: string
  strengths: string[]
  areasForImprovement: string[]
  recommendations: AIRecommendation[]
  generatedAt: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface CreateLessonPlanForm {
  title: string
  areaId: string
  grade: number
  duration: number
  objectives: string[]
  activities: Omit<Activity, 'id'>[]
}
