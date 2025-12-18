
import { useEffect, useState } from "react";
import api from "../services/api";

type Task = {
  _id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed";
};

const Home = () => {

  

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    if (editingId !== null) {


      await api.patch("/task/" + editingId, { title, description, status }, { withCredentials: true });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingId
            ? { ...task, title, description }
            : task
        )
      );
      setEditingId(null);
    } else {

     const response = await api.post("/task", { title, description }, { withCredentials: true });
      console.log(response.data);
      console.log(response.data._id);
      

      setTasks((prev) => [
        ...prev,
        {
          _id: response.data._id,
          title,
          description,
          status: "Pending",
        },
      ]);


    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };



  // EDIT
  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task._id);
  };


  // DELETE
  const handleDelete = async (id: number) => {

    console.log("delete id",id);
    

      await api.delete("/task/" + id, { withCredentials: true });


    setTasks((prev) => prev.filter((t) => t._id !== id));

    
  };

  // TOGGLE STATUS
  const toggleStatus = async (id: number) => {
    const newStatus =status === "Pending" ? "Completed" : "Pending";
    await api.patch("/task/" + id, {status:newStatus }, { withCredentials: true });
    setStatus(status === "Pending" ? "Completed" : "Pending");


    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? {
            ...task,
            status:
              task.status === "Pending"
                ? "Completed"
                : "Pending",
          }
          : task
      )
    );
  };




useEffect(()=>{
    const fetchTasks = async () => {
      const response = await api.get("/task", { withCredentials: true });

      console.log(response.data);
      
      setTasks(response.data);
    }
    fetchTasks();
},[])


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">
          Task Manager
        </h2>

        {/* Add / Edit */}
        <div className="space-y-2 mb-4">
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button
            onClick={handleSubmit}
            className="border px-3 py-1 w-full"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-2 rounded"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black">
                  {task.title}
                </h3>
                <button
                  onClick={() =>
                    toggleStatus(task._id)
                  }
                  className="text-sm border px-2"
                >
                  {task.status}
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                {task.description}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-sm border px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDelete(task._id)
                  }
                  className="text-sm border px-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          {tasks.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No tasks added
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
