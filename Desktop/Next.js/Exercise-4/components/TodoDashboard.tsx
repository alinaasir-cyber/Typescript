"use client";

import { useActionState, useMemo, useState } from "react";

type Priority = "low" | "medium" | "high";
type StatusFilter = "all" | "active" | "completed";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
};

type FormState = {
  message: string;
  success: boolean;
};

const priorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const initialTodos: Todo[] = [
  {
    id: "todo-1",
    title: "Design homepage layout",
    completed: false,
    priority: "high",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    updatedAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: "todo-2",
    title: "Review analytics dashboard",
    completed: true,
    priority: "medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    updatedAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: "todo-3",
    title: "Ship onboarding follow-up",
    completed: false,
    priority: "low",
    createdAt: Date.now() - 1000 * 60 * 60 * 16,
    updatedAt: Date.now() - 1000 * 60 * 60,
  },
];

const initialState: FormState = { message: "", success: false };

function formatRelativeTime(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMinutes) < 60) {
    return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) === 1 ? "" : "s"} ago`;
  }

  if (Math.abs(diffHours) < 24) {
    return `${Math.abs(diffHours)} hour${Math.abs(diffHours) === 1 ? "" : "s"} ago`;
  }

  return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} ago`;
}

function priorityClass(priority: Priority) {
  const map: Record<Priority, string> = {
    high: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
    medium: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    low: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
  };

  return map[priority];
}

export default function TodoDashboard() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [state, action, isPending] = useActionState(
    (_previousState: FormState, formData: FormData) => {
      const title = String(formData.get("title") ?? "").trim();
      const priority = String(formData.get("priority") ?? "medium") as Priority;

      if (!title) {
        return { message: "Please enter a task title.", success: false };
      }

      const time = Date.now();
      const newTodo: Todo = {
        id: `todo-${time}`,
        title,
        completed: false,
        priority,
        createdAt: time,
        updatedAt: time,
      };

      setTodos((current) => [newTodo, ...current]);
      return {
        message: `Added “${title}” to your list.`,
        success: true,
      };
    },
    initialState,
  );

  const filteredTodos = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    return [...todos]
      .filter((todo) => {
        const matchesStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "completed"
              ? todo.completed
              : !todo.completed;

        const matchesSearch =
          !searchValue || todo.title.toLowerCase().includes(searchValue);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.updatedAt - a.updatedAt;
      });
  }, [searchTerm, statusFilter, todos]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const selectedCount = selectedIds.length;

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const markSelected = (completed: boolean) => {
    if (!selectedIds.length) return;

    setTodos((current) =>
      current.map((todo) =>
        selectedIds.includes(todo.id)
          ? { ...todo, completed, updatedAt: Date.now() }
          : todo,
      ),
    );
    setSelectedIds([]);
  };

  const deleteSelected = () => {
    if (!selectedIds.length) return;

    setTodos((current) =>
      current.filter((todo) => !selectedIds.includes(todo.id)),
    );
    setSelectedIds([]);
  };

  const markAll = (completed: boolean) => {
    setTodos((current) =>
      current.map((todo) => ({ ...todo, completed, updatedAt: Date.now() })),
    );
  };

  return (
    <main className="min-h-screen bg-[#020817] p-4 text-slate-100 md:p-8">
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-800 bg-[#020b17] shadow-2xl shadow-slate-950/60">
        <section className="w-full p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Lesson</div>
              <h2 className="mt-2 text-3xl font-bold text-white">Todo Dashboard</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => markAll(true)}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
              >
                Mark all done
              </button>
              <button
                type="button"
                onClick={() => markAll(false)}
                className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Reset all
              </button>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Create Todo</h3>
              {selectedCount > 0 ? (
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-300">
                  {selectedCount} selected
                </span>
              ) : null}
            </div>

            <form action={action} className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm text-slate-300">
                  Task title
                </label>
                <input
                  id="title"
                  name="title"
                  defaultValue=""
                  placeholder="Add a new task"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400"
                />
              </div>

              <div>
                <label htmlFor="priority" className="mb-2 block text-sm text-slate-300">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  defaultValue="medium"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="self-end rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Adding..." : "Add task"}
              </button>
            </form>

            {state.message ? (
              <p
                role={state.success ? "status" : "alert"}
                className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
                  state.success
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-200"
                }`}
              >
                {state.message}
              </p>
            ) : null}
          </div>

          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {(["all", "active", "completed"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setStatusFilter(option)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition ${
                      statusFilter === option
                        ? "bg-sky-400 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search tasks"
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => markSelected(true)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
                >
                  Complete selected
                </button>
                <button
                  type="button"
                  onClick={() => markSelected(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
                >
                  Reopen selected
                </button>
                <button
                  type="button"
                  onClick={deleteSelected}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/20"
                >
                  Delete selected
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTodos.length ? (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(todo.id)}
                        onChange={() => toggleSelection(todo.id)}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-sky-400"
                      />

                      <button
                        type="button"
                        onClick={() => toggleTodo(todo.id)}
                        className={`h-5 w-5 rounded-full border ${
                          todo.completed
                            ? "border-emerald-400 bg-emerald-400"
                            : "border-slate-500 bg-transparent"
                        }`}
                        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                      />

                      <div>
                        <p
                          className={`font-medium ${
                            todo.completed ? "text-slate-500 line-through" : "text-slate-200"
                          }`}
                        >
                          {todo.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span>Created {formatRelativeTime(todo.createdAt)}</span>
                          <span>•</span>
                          <span>Updated {formatRelativeTime(todo.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:justify-end">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${priorityClass(todo.priority)}`}>
                        {todo.priority}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteTodo(todo.id)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center text-slate-400">
                  No tasks match your current search or filters.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <h3 className="mb-4 text-xl font-semibold">Progress</h3>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>{completedCount} complete</span>
              <span>{todos.length - completedCount} remaining</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${todos.length ? (completedCount / todos.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
