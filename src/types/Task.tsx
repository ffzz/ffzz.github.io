
export interface Task {
  id: number;
  // task name
  name: string;
  // who is responsible for
  processorId: number;
  projectId: number;
  // which task group
  epicId: number;
  // which kanban 
  kanbanId: number;
  // bug type task or task
  typeId: number;
  // tagId:number;
  note: string;
}
