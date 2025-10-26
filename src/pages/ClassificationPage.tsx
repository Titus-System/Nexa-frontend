import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import type { UploadResponse, UploadError, UploadSuccess } from "../types/uploadResponse";
import { API_URL } from "../config";

const SubmitPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState({ partnumber: "", description: "", manufacturer: "", supplier: "" });
  const navigate = useNavigate();
  const [result, setResult] = useState<UploadResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/classify-partnumber`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`Resposta recebida do servidor: ${JSON.stringify(data)}`)
      if (!data.job_id){
        navigate(`/result/${data.task_id}`);  
      }
      navigate(`/result/${data.task_id}`, { state: { room_id: data.room_id } });
    } else {
      alert("Erro ao enviar partnumber");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // abre o explorador de arquivos
  };

  const handleUploadFile = async (file: File) => {
    setSelectedFile(file);
    if (!file) {
      alert("Por favor, selecione um arquivo PDF antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("pedido", file);

    try {
      const response = await fetch(`${API_URL}/upload-pdf`,{
        method: "POST",
        body: formData,
      })

      const data: UploadResponse = await response.json();
      setResult(data);
      console.log(result);

      if (!response.ok) {
        const errorMessage = (data as UploadError).error || (data as UploadError).message || "Erro desconhecido no servidor";
        alert(errorMessage);
        return;
      }

      const successData = data as UploadSuccess;
      console.log(successData);
      console.log("Part Numbers extraídos:", successData.partnumbers);
      navigate(`/result/${successData.task_id}`, { state: { room_id: successData.room_id } });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro no envio:", error.message);
          alert("Erro de conexão ou falha inesperada.");
        }
      }
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center mb-28">
      <div className="mt-48 mb-24 flex flex-col items-center">
        <h1 className="text-[2.9rem] font-bold mb-6 text-[#010A26]">Análise de Informações</h1>
        <p className="text-xl text-[#9799A6] w-[60%]">Faça upload do PDF ou insira o Part Number manualmente para classificação fiscal automática. Reduza erros e garanta conformidade total com a Receita Federal.</p>
      </div>
      {/* <button
        className="bg-[#0F3B57] text-white rounded-lg px-4 py-2 font-medium"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Modo Claro ☀️" : "Modo Escuro 🌙"}
      </button> */}
      <div className="w-[85%]">
        <div className="bg-white pt-12 pb-20 px-20 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.15)] flex flex-col justify-center mb-20">
          <h2 className="font-semibold text-[#010A26] text-3xl mb-7 text-left">Upload de Documento</h2>
          <div className="bg-white h-[20rem] w-[100%] flex justify-center items-center flex-col gap-6 border-2 border-dashed border-[#082640] rounded-xl" onDrop={(e) => {e.preventDefault(); const file = e.dataTransfer.files?.[0];
            if (file && file.type === "application/pdf") {
              setSelectedFile(file);
              handleUploadFile(file);
              } else {
                alert("Por favor, envie um arquivo PDF válido.");
              }
            }}
            onDragOver={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="flex justify-center items-center text-[#0F3B57] text-[2.8rem] bg-[#F2F0EB] py-[1.4rem] px-[1rem] rounded-[100%]"/>
            <div>
              {!selectedFile ? (
                <>
                  <h3 className="text-[#010A26] font-semibold text-lg">
                    Arraste o PDF aqui
                  </h3>
                  <p className="text-[#9799A6]">Ou clique para selecionar arquivo</p>
                </>
              ) : (
                <h3 className="text-[#010A26] font-semibold text-lg">
                  {selectedFile.name}
                </h3>
              )}
          </div>
            <input type="file" accept="application/pdf" ref={fileInputRef} onChange={(e) => {const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              handleUploadFile(file);
            }
          }} className="hidden"/>
            <button onClick={handleButtonClick} className="font-bold text-base bg-[#0F3B57] py-3 px-8 text-white rounded-lg">Selecionar PDF</button>
          </div>
        </div>
        </div>
        <div className="mb-10 flex flex-row items-center justify-center gap-4 w-[100%]">
          <hr className="w-[38%] text-[#9799A6]"/>
          <p className="text-[#9799A6] text-xl font-medium">OU DIGITE MANUALMENTE</p>
          <hr className="w-[38%] text-[#9799A6]"/>
        </div>
        <div className="w-[85%]">
          <div className="pt-12 pb-20 flex flex-col justify-center w-full">
            <form onSubmit={handleSubmit} className="w-full">
              {/* Caixa branca ocupa toda a largura */}
              <div className="bg-white shadow-[0_0_60px_rgba(0,0,0,0.15)] rounded-xl p-10 mb-10 w-full">
                <h2 className="font-semibold text-[#010A26] text-2xl text-left mb-7">Entrada Manual</h2>

                <div className="text-left space-y-4">
                  <label className="font-medium" htmlFor="partnumber">Part Number *</label>
                  <input
                    className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]"
                    name="partnumber"
                    placeholder="Ex: STM32F407VGT6, LM358N, etc."
                    value={form.partnumber}
                    onChange={handleChange}
                    required
                  />

                  <label className="font-medium" htmlFor="description">Descrição (Opcional)</label>
                  <textarea
                    className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem] h-30 resize-none"
                    name="description"
                    placeholder="Descrição adicional do componente"
                    value={form.description}
                    onChange={handleChange}
                  />

                  <label className="font-medium" htmlFor="manufacturer">Fabricante (Opcional)</label>
                  <input
                    className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]"
                    name="manufacturer"
                    placeholder="Nome do fabricante"
                    value={form.manufacturer}
                    onChange={handleChange}
                  />

                  <label className="font-medium" htmlFor="supplier">Fornecedor (Opcional)</label>
                  <input
                    className="border p-2 w-full bg-white border-[#082640] rounded-md mt-[0.6rem]"
                    name="supplier"
                    placeholder="Nome do fornecedor"
                    value={form.supplier}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Botões fora do fundo branco */}
              <div className="flex justify-end gap-4">
                <button
                  type="reset"
                  className="rounded-lg font-medium text-base border-1 py-2 px-4 border-[#0F3B57] cursor-pointer"
                >
                  Limpar dados
                </button>
                <button
                  type="submit"
                  className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                  Analisar
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  };

export default SubmitPage;
