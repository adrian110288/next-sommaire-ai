import React from "react";

interface TodoReminderProps {
  message?: string;
}

const TodoReminder: React.FC<TodoReminderProps> = ({ message = "TODO: Complete this section later." }) => (
  <div
    style={{
      background: "#fffbe6",
      color: "#ad8b00",
      border: "1px solid #ffe58f",
      borderRadius: 8,
      padding: "0.75rem 1rem",
      margin: "1rem 0",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}
    aria-label="TODO Reminder"
  >
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#ffe58f"/><path d="M10 6v4" stroke="#ad8b00" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="14" r="1" fill="#ad8b00"/></svg>
    {message}
  </div>
);

export default TodoReminder;
