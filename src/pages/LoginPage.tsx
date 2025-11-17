import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';

const LoginPage: React.FC = () => {
  const [switchMode, setSwitchMode] = useState("login"); 
  const [darkMode, setDarkMode] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`p-6 flex flex-col justify-center items-center mb-28 ${darkMode ? "dark-mode" : ""}`}>
      <div className="mt-48 mb-24 flex flex-col items-center">
        <div className='border-1 border-[#9799A6]/60 rounded-xl p-0 flex flex-row w-[65%] justify-center items-center h-[25rem] shadow-[0_0_60px_rgba(0,0,0,0.15)]'>
          <div className='bg-gradient-to-tr from-[#0F3B57] from-20% to-[#1b5477] to-90% rounded-l-xl h-[100%] w-[50%] py-[12%] px-[5%] flex items-center justify-center flex-col'>
            <h2 className='font-bold text-white text-3xl mb-9'>Tenha acesso a todos os recursos do Nexa.</h2>
            <p className='text-white text-xs leading-5'>Crie sua conta e tenha todas as suas análises a um clique de distância, além de estatísticas exclusivas. 
            Classificações precisas, relatórios automáticos e total conformidade com a Receita Federal.</p>
          </div>
          <div className='w-[50%] h-[100%] px-[5%] py-0 flex items-center justify-center flex-col bg-white rounded-r-xl'>
            <div className='m-[40px] w-[100%] h-[100%] flex flex-col justify-start'>
              <div className='flex cursor-pointer bg-[#0F3B57]/10 rounded-xl'>
              <button
          onClick={() => setSwitchMode("login")}
          className={`
            flex-1 py-2 text-center transition-all
            ${switchMode === "login" ? "bg-[#0F3B57]/80 rounded-l-xl text-white font-semibold" : ""} 
          `}
        >
          Login
        </button>

        <button
          onClick={() => setSwitchMode("cadastro")}
          className={`
            flex-1 py-2 text-center transition-all
            ${switchMode === "cadastro" ? "bg-[#0F3B57]/80 rounded-r-xl text-white font-semibold" : ""}
          `}
        >
          Cadastro
        </button>
              </div>

      {/* FORMULÁRIO QUE MUDA */}
        {switchMode === "login" ? <LoginForm /> : <CadastroForm />}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoginForm() {
  return (
    <form>

      <label>Email:</label>
      <input type="email" required />

      <br /><br />

      <label>Senha:</label>
      <input type="password" required />

      <br /><br />

      <button type="submit" className='mt-[2.5rem]'>Login</button>
    </form>
  );
}

function CadastroForm() {
  return (
    <form className="flex flex-col justify-center items-center gap-4 w-full">
      <br />
      <div className="w-full flex flex-col text-left">
        <label>Nome:</label>
        <input type="text" className="bg-[#0F3B57]/10 rounded-lg" required />
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col text-left">
          <label>Email:</label>
          <input type="email" className="bg-[#0F3B57]/10 w-full rounded-lg" required />
        </div>

        <div className="flex-1 flex flex-col text-left">
          <label>Senha:</label>
          <input type="password" className="bg-[#0F3B57]/10 w-full rounded-lg" required />
        </div>
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col text-left">
          <label>Cargo:</label>
          <input type="text" className="bg-[#0F3B57]/10 w-full rounded-lg" required />
        </div>

        <div className="flex-1 flex flex-col text-left">
          <label>Telefone:</label>
          <input type="tel" className="bg-[#0F3B57]/10 w-full rounded-lg" required />
        </div>
      </div>

      <button type="submit" className="mt-10">Cadastrar</button>
    </form>
  );
}


export default LoginPage;
