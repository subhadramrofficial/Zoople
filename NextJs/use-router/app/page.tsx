// "use client";

// import { useEffect, useState } from "react";
// import type { FormEvent, ChangeEvent } from "react";

// type User = {
//   id: number;
//   name: string;
// };

// const API_URL = "/login/postuser";

// export default function LoginPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [name, setName] = useState<string>("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   // READ: Fetch users
//   async function getUsers(): Promise<void> {
//     try {
//       setError("");

//       const res = await fetch(API_URL);

//       if (!res.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       const data: User[] = await res.json();
//       setUsers(data);
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error ? err.message : "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     void getUsers();
//   }, []);

//   // CREATE and UPDATE
//   async function handleSubmit(
//     e: FormEvent<HTMLFormElement>
//   ): Promise<void> {
//     e.preventDefault();

//     if (!name.trim()) {
//       setError("Please enter a name");
//       return;
//     }

//     try {
//       setError("");

//       const method = editingId !== null ? "PUT" : "POST";

//       const body =
//         editingId !== null
//           ? { id: editingId, name: name.trim() }
//           : { name: name.trim() };

//       const res = await fetch(API_URL, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) {
//         throw new Error("Operation failed");
//       }

//       const data: { message: string; users: User[] } =
//         await res.json();

//       setUsers(data.users);
//       setName("");
//       setEditingId(null);
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error ? err.message : "Something went wrong"
//       );
//     }
//   }

//   // Select user for editing
//   function handleEdit(user: User): void {
//     setName(user.name);
//     setEditingId(user.id);
//     setError("");
//   }

//   // DELETE
//   async function handleDelete(id: number): Promise<void> {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       setError("");

//       const res = await fetch(API_URL, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) {
//         throw new Error("Delete failed");
//       }

//       const data: { message: string; users: User[] } =
//         await res.json();

//       setUsers(data.users);

//       if (editingId === id) {
//         setName("");
//         setEditingId(null);
//       }

//       window.alert("User deleted successfully!");
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error ? err.message : "Something went wrong"
//       );
//     }
//   }

//   // Cancel editing
//   function handleCancel(): void {
//     setName("");
//     setEditingId(null);
//     setError("");
//   }

//   return (
//     <main className="mx-auto mt-10 max-w-xl p-6">
//       <h1 className="mb-6 text-3xl font-bold">User CRUD</h1>

//       {/* Add / Edit Form */}
//       <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter user name"
//           value={name}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setName(e.target.value)
//           }
//           className="min-w-0 flex-1 rounded border px-3 py-2"
//         />

//         <button
//           type="submit"
//           className="rounded bg-blue-600 px-4 py-2 text-white"
//         >
//           {editingId !== null ? "Update" : "Add"}
//         </button>

//         {editingId !== null && (
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="rounded bg-gray-500 px-3 py-2 text-white"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {error && (
//         <p role="alert" className="mb-4 text-red-600">
//           {error}
//         </p>
//       )}

//       {/* Users List */}
//       <h2 className="mb-3 text-xl font-semibold">Users List</h2>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="space-y-3">
//           {users.map((user: User) => (
//             <div
//               key={user.id}
//               className="flex items-center justify-between gap-3 rounded border p-4"
//             >
//               <div>
//                 <p className="font-medium">{user.name}</p>
//                 <p className="text-sm text-gray-500">
//                   ID: {user.id}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => handleEdit(user)}
//                   className="rounded bg-yellow-500 px-3 py-1 text-white"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => void handleDelete(user.id)}
//                   className="rounded bg-red-600 px-3 py-1 text-white"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { Student } from "./data/student";

const API_URL = "/login/postuser2";

const courses = ["MERN Stack", "Python", "React", "Next.js", "Java"];

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(courses[0]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // READ: Get all students
  async function getStudents(): Promise<void> {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }

      const data: Student[] = await res.json();
      setStudents(data);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void getStudents();
  }, []);

  // Clear the form
  function resetForm(): void {
    setName("");
    setEmail("");
    setCourse(courses[0]);
    setEditingId(null);
  }

  // CREATE and UPDATE
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !course) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");

      const method = editingId !== null ? "PUT" : "POST";

      const body =
        editingId !== null
          ? {
              id: editingId,
              name: name.trim(),
              email: email.trim(),
              course,
            }
          : {
              name: name.trim(),
              email: email.trim(),
              course,
            };

      const res = await fetch(API_URL, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data: {
        message: string;
        users?: Student[];
      } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setStudents(data.users ?? []);
      resetForm();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  // Select student for editing
  function handleEdit(student: Student): void {
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setEditingId(student.id);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DELETE
  async function handleDelete(id: number): Promise<void> {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      setError("");

      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data: {
        message: string;
        users?: Student[];
      } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setStudents(data.users ?? []);

      if (editingId === id) {
        resetForm();
      }

      window.alert("Student deleted successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-10">
      <h1 className="mb-2 text-3xl font-bold">Student Management</h1>

      <p className="mb-8 text-gray-600">Add, view, edit and delete students.</p>

      {/* Student Form */}
      <section className="mb-10 rounded-xl border p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          {editingId !== null ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter student email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="course" className="mb-1 block font-medium">
              Course
            </label>

            <select
              id="course"
              value={course}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCourse(e.target.value)
              }
              className="w-full rounded-lg border bg-white px-3 py-2"
              required
            >
              {courses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingId !== null ? "Update Student" : "Add Student"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Student List */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Students List ({students.length})
        </h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500">No students found.</p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{student.name}</h3>

                  <p className="text-sm text-gray-600">
                    Email: {student.email}
                  </p>

                  <p className="text-sm text-gray-600">
                    Course: {student.course}
                  </p>

                  <p className="text-xs text-gray-500">ID: {student.id}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(student)}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleDelete(student.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
