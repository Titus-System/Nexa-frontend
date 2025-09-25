import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubmitPage: React.FC = () => {
  const [form, setForm] = useState({ partnumber: "", description: "", manufacturer: "", supplier: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/classify-partnumber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      navigate(`/result/${data.task_id}`, { state: { room_id: data.room_id } });
    } else {
      alert("Erro ao enviar partnumber");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Submeter Partnumber</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" name="partnumber" placeholder="Partnumber" value={form.partnumber} onChange={handleChange} required />
        <input className="border p-2 w-full" name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <input className="border p-2 w-full" name="manufacturer" placeholder="Fabricante" value={form.manufacturer} onChange={handleChange} />
        <input className="border p-2 w-full" name="supplier" placeholder="Fornecedor" value={form.supplier} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </div>
  );
};

export default SubmitPage;
