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
      <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Análise de Informações</h1>
      <p>Faça upload do PDF ou insira o Part Number manualmente para classificação fiscal automática.</p>
      <div className="text-left">
        <h2 className="font-semibold text-[#010A26] text-2xl">Upload de Documento</h2>
        <h2 className="font-semibold text-[#010A26] text-2xl">Entrada Manual</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="font-medium" htmlFor="partnumber">Part Number *</label>
          <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.8rem]" name="partnumber" placeholder="Ex: STM32F407VGT6, LM358N, etc." value={form.partnumber} onChange={handleChange} required />
          <label className="font-medium" htmlFor="partnumber">Descrição (Opcional)</label>
          <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[1rem]" name="description" placeholder="Descrição adicional do componente" value={form.description} onChange={handleChange} />
          <label className="font-medium" htmlFor="partnumber">Fabricante (Opcional)</label>
          <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[1rem]" name="manufacturer" placeholder="Nome do fabricante" value={form.manufacturer} onChange={handleChange} />
          <label className="font-medium" htmlFor="partnumber">Fornecedor (Opcional)</label>
          <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[1rem]" name="supplier" placeholder="Nome do fornecedor" value={form.supplier} onChange={handleChange} />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;
