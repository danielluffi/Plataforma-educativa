import Dexie, { Table } from 'dexie'
import type { 
  User, 
  Student, 
  LessonPlan, 
  Attendance, 
  Assessment, 
  PendingChange,
  SyncStatus 
} from '@/types'

// IndexedDB schema using Dexie
class AulaMendozaDB extends Dexie {
  users!: Table<User>
  students!: Table<Student>
  lessonPlans!: Table<LessonPlan>
  attendance!: Table<Attendance>
  assessments!: Table<Assessment>
  pendingChanges!: Table<PendingChange>
  syncMetadata!: Table<{ key: string; value: any }>

  constructor() {
    super('AulaMendozaDB')
    
    this.version(1).stores({
      users: '++id, email, role, schoolId',
      students: '++id, schoolId, grade, section',
      lessonPlans: '++id, teacherId, schoolId, grade, area',
      attendance: '++id, studentId, date, recordedBy',
      assessments: '++id, studentId, lessonPlanId, recordedBy',
      pendingChanges: '++id, type, timestamp, synced',
      syncMetadata: 'key' // For storing lastSync, etc.
    })

    // Indexes for offline queries
    this.version(2).stores({
      users: '++id, email, *[role], *schoolId',
      students: '++id, *schoolId, grade, *section',
      lessonPlans: '++id, *teacherId, *schoolId, grade',
      attendance: '++id, *studentId, date, *recordedBy',
      assessments: '++id, *studentId, *lessonPlanId, *recordedBy',
      pendingChanges: '++id, *type, timestamp, *synced',
      syncMetadata: 'key'
    })
  }
}

// Create singleton instance
export const db = new AulaMendozaDB()

// Helper functions for offline-first operations
export const offlineService = {
  // Save data locally
  async saveLocal<T>(table: keyof AulaMendozaDB, data: T): Promise<number> {
    return await (db[table] as Table<T>).add(data)
  },

  // Update data locally
  async updateLocal<T>(table: keyof AulaMendozaDB, id: any, data: Partial<T>): Promise<number> {
    return await (db[table] as Table<T>).update(id, data)
  },

  // Get all from table
  async getAll<T>(table: keyof AulaMendozaDB): Promise<T[]> {
    return await (db[table] as Table<T>).toArray()
  },

  // Get by ID
  async getById<T>(table: keyof AulaMendozaDB, id: any): Promise<T | undefined> {
    return await (db[table] as Table<T>).get(id)
  },

  // Query with filters
  async query<T>(
    table: keyof AulaMendozaDB, 
    filterFn: (item: T) => boolean
  ): Promise<T[]> {
    const all = await (db[table] as Table<T>).toArray()
    return all.filter(filterFn)
  },

  // Delete locally
  async deleteLocal(table: keyof AulaMendozaDB, id: any): Promise<void> {
    await (db[table] as Table<any>).delete(id)
  },

  // Clear table
  async clearTable(table: keyof AulaMendozaDB): Promise<void> {
    await (db[table] as Table<any>).clear()
  },

  // Track change for later sync
  async trackChange(type: 'create' | 'update' | 'delete', data: any): Promise<number> {
    return await db.pendingChanges.add({
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    })
  },

  // Get pending changes
  async getPendingChanges(): Promise<PendingChange[]> {
    return await db.pendingChanges.where('synced').equals(false).toArray()
  },

  // Mark changes as synced
  async markAsSynced(ids: string[]): Promise<void> {
    const tx = db.transaction('rw', db.pendingChanges)
    await tx.then(async () => {
      for (const id of ids) {
        await db.pendingChanges.update(id, { synced: true })
      }
    })
  },

  // Sync status management
  async updateSyncStatus(status: Partial<SyncStatus>): Promise<void> {
    await db.syncMetadata.put({ key: 'syncStatus', value: status })
  },

  async getSyncStatus(): Promise<SyncStatus | null> {
    const result = await db.syncMetadata.get('syncStatus')
    return result?.value || null
  },

  // Check if online
  isOnline(): boolean {
    return navigator.onLine
  },

  // Listen to online/offline events
  onConnectionChange(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }
}

export default db
