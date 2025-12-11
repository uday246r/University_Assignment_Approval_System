import { useEffect, useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export const CreateUser = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [departmentDetails, setDepartmentDetails] = useState<any[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${VITE_API_BASE}/api/department`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        setDepartmentDetails(res.data.departments);
      } catch (err) {
        console.log("Failed to fetch departments", err);
      }
    };

    fetchDepartmentDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
const payload = {
  name,
  role,
  email,
  password,
  departmentId: selectedDepartmentId,
};

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${VITE_API_BASE}/api/admin/createUser`,
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("User created successfully", res.data);

      setName("");
      setRole("");
      setEmail("");
      setPassword("");
      setSelectedDepartmentId("");

    } catch (err) {
      console.log("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      <InputBox
        label="Name"
        placeholder="Provide name of user"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputBox
        label="Role"
        placeholder="Enter Role (student/professor/hod)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <InputBox
        label="Email"
        placeholder="Enter valid emailId"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputBox
        label="Password"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <label className="text-white block mb-1">Select Department</label>

        <select
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          value={selectedDepartmentId}
          onChange={(e) => setSelectedDepartmentId(e.target.value)}
        >
          <option value="">-- Choose Department --</option>

          {departmentDetails.length > 0 ? (
            departmentDetails.map((dept: any) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
      </div>

      <Button
        onClick={handleSubmit}
        label={loading ? "Creating..." : "Submit"}
      />

    </div>
  );
};
