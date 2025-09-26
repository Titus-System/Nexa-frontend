import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

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
    <div className="p-6 flex flex-col justify-center items-center">
      <div className="mb-24">
        <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Análise de Informações</h1>
        <p>Faça upload do PDF ou insira o Part Number manualmente para classificação fiscal automática.</p>
      </div>
      <div className="w-[90%]">
        <h2 className="font-semibold text-[#010A26] text-2xl mb-4 text-left">Upload de Documento</h2>
        <div className="bg-white h-[20rem] w-[100%] flex justify-center items-center flex-col gap-6 border-2 border-dashed border-[#082640] rounded-xl mb-16">
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-[#9799A6] text-[4rem]"/>
          <div>
            <h3 className="text-[#010A26] font-medium">Arraste o PDF aqui</h3>
            <p className="text-[#9799A6]">Ou clique para selecionar arquivo</p>
          </div>
          <button className="font-bold bg-[#0F3B57] py-2 px-3 text-white rounded-lg">Selecionar PDF</button>
        </div>
        <h2 className="font-semibold text-[#010A26] text-2xl text-left mb-7">Entrada Manual</h2>
        <form onSubmit={handleSubmit}>
          <div className="text-left space-y-4 mb-14">
            <label className="font-medium" htmlFor="partnumber">Part Number *</label>
            <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]" name="partnumber" placeholder="Ex: STM32F407VGT6, LM358N, etc." value={form.partnumber} onChange={handleChange} required />
            <label className="font-medium" htmlFor="partnumber">Descrição (Opcional)</label>
            <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]" name="description" placeholder="Descrição adicional do componente" value={form.description} onChange={handleChange} />
            <label className="font-medium" htmlFor="partnumber">Fabricante (Opcional)</label>
            <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]" name="manufacturer" placeholder="Nome do fabricante" value={form.manufacturer} onChange={handleChange} />
            <label className="font-medium" htmlFor="partnumber">Fornecedor (Opcional)</label>
            <input className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]" name="supplier" placeholder="Nome do fornecedor" value={form.supplier} onChange={handleChange} />
          </div>
          <div className="flex justify-end gap-4">
            <button type="reset" className="rounded-lg font-medium border-1 py-2 px-3 border-[#0F3B57]">Limpar dados</button>
            <button type="submit" className="bg-[#0F3B57] text-white px-4 py-2 rounded-lg font-bold">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
              Analisar
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  };

export default SubmitPage;
