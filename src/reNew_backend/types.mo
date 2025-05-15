module {
  public type TaskType = {
    #Assignment;
    #Project;
    #Announcement;
  };

  public type Task = {
    id: Nat;
    title: Text;
    description: Text;
    taskType: TaskType;
    dueDate: Text; // ISO date string, e.g., "2025-05-20"
    assignedSection: Text; // e.g., "BSIT-3A"
    createdBy: Text; // Teacher's username
    createdAt: Int; // Timestamp in nanoseconds
  };
};