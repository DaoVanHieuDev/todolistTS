import { Input, Button, Alert } from "antd";
import React, { useState } from "react";
import { Job } from "../entities/Job";
// import { useRef } from "react";
const TodoForm: React.FC = () => {
  // const inputRef = useRef();
  const [showError, setShowError] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });
  const [job, setJob] = useState<string>("");

  const validateData = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    validateData(name, value);
    setJob(value); // Sửa dòng này để tránh lỗi
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Math.ceil(Math.random() * 1000),
      name: job,
      status: false,
    };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJob(""); // Xóa giá trị job sau khi thêm mới công việc
    //  inputRef.current.focus();
  };

  const handleDelete = (id: number) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJob("");
  };

  // update
  const handleUpdate = (id: number) => {
    const updateJobLocal = jobs.map((job: Job) => {
      if (job.id === id) {
        job.status = !job.status;
      }
      return job;
    });
    setJobs(updateJobLocal);
    localStorage.setItem("jobs", JSON.stringify(updateJobLocal));
  };

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold text-center">Danh sách công việc</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="nhập công việc .... "
              value={job}
              onChange={handleChange}
              name="job" // Thêm name cho input
            />
            <Button type="primary" className="bg-blue-600" htmlType="submit">
              Thêm
            </Button>
          </div>
        </form>
        <Alert
          message="Tên công việc không được để trống"
          type="error"
          showIcon
          className="mb-2"
        />
      </div>

      {jobs.length ? (
        jobs.map((job: Job) => (
          <div className="border shadow mb-2" key={job.id}>
            <div className="flex justify-between items-center p-1">
              <div className="flex items-center gap-2">
                <input
                  checked={job.status}
                  type="checkbox"
                  className="h-6"
                  onChange={() => handleUpdate(job.id)}
                />
                <span>{job.name}</span>
              </div>
              <Button danger onClick={() => handleDelete(job.id)}>
                Xóa{" "}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="border shadow mb-2">
          <div className="flex justify-between items-center p-1">
            <div className="flex items-center gap-2">
              {/* <input type="checkbox" className="h-6" /> */}
              <span> Chưa có công việc</span>
            </div>
            {/* <Button danger>Xóa </Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default TodoForm;
