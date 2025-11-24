import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPhone, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchData } from "../functions/fetchData";
import { faCircleExclamation, faSpinner} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../components/ProgressBar";

type TaskStatusCount = {
  total: number;
  done: number;
  processing: number;
  failed: number;
};

const AccountPage: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const { logout } = useAuth();               
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { user } = useAuth();
    const initials = getInitials(user?.name);
    const [statusAll, setStatusAll] = useState<TaskStatusCount | null>(null);
    const [statusMonth, setStatusMonth] = useState<TaskStatusCount | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    function handleLogout() {
        logout();                                     
        navigate("/login");                            
    }

    function getInitials(name: string | undefined) {
        if (!name) return "";

        const parts = name.trim().split(" ");

        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }

        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    useEffect(() => {
        async function loadTasks() {
        try {
            const tasks = await FetchData();

            // 🔹 Cálculo geral
            const allCounts = {
            total: tasks.length,
            done: tasks.filter(t => t.status === "DONE").length,
            processing: tasks.filter(t => t.status === "PROCESSING").length,
            failed: tasks.filter(t => t.status === "FAILED").length
            };

            // 🔹 Cálculo do mês atual
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const tasksThisMonth = tasks.filter(task => {
            const date = new Date(task.created_at);
            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
            });

            const monthCounts = {
            total: tasksThisMonth.length,
            done: tasksThisMonth.filter(t => t.status === "DONE").length,
            processing: tasksThisMonth.filter(t => t.status === "PROCESSING").length,
            failed: tasksThisMonth.filter(t => t.status === "FAILED").length
            };

            setStatusAll(allCounts);
            setStatusMonth(monthCounts);

        } catch (err) {
            console.error("Erro ao buscar tasks:", err);
        }
        }

        loadTasks();
    }, []);


    return (
        <div className={`relative w-full mb-28 ${darkMode ? "bg-[#010A26]" : ""}`}>
            <div className="mt-[3.5rem]">
                <img src="/banner_account.jpeg" alt="banner_account" className="w-full" />
                <div className="flex flex-col mb-6">
                    <div className="absolute top-[20.5rem] left-[5rem] w-40 h-40 p-7 rounded-full bg-white shadow-lg flex items-center justify-center text-7xl font-bold text-[#082640] border-4 border-white">
                        {initials}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[2.9rem] font-bold mb-6 text-[#082640] pt-[6.5rem] pl-[4.5rem] text-left">{user?.name}</h1>
                        <p className={`text-left pl-[4.5rem] pb-[2rem] text-2xl ${darkMode ? "text-[#90929c]" : "text-[#082640]"}`}>{user?.role} - <strong>Tecsys</strong></p>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col items-center ${darkMode ? "bg-[#010A26]" : ""}`}>
                <div className={`${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-white"} w-[93%] rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.15)] px-12 py-9`}>
                    <div className="flex flex-row justify-between mb-14">
                        <h2 className={`font-bold text-3xl underline ${darkMode ? 'text-white' : 'text-[#082640]'}`}>Informações Pessoais</h2>
                        <button>
                            <FontAwesomeIcon icon={faPencil} className={`px-2 py-2 text-3xl rounded-lg ${darkMode ? "text-white" : "text-[#082640]"}`} />
                        </button>
                    </div>
                    <div className="flex flex-col justify-self-start w-full">
                        <div className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className={`text-2xl ${darkMode? "text-white" : " text-[#0F3B57]"}`} />
                            <label htmlFor="nome-completo" className={`text-xl font-medium ${darkMode? "text-white" : " text-[#0F3B57]"}`}>Nome completo</label>
                        </div>
                        <input type="text" name="nome-completo" placeholder={`${user?.name}`} className={`border-1 w-full p-[0.4rem] bg-white rounded-md mt-[0.6rem] mb-[1.4rem] ${darkMode? "placeholder-[#90929c] border-white" : "border-[#082640]"}`} />
                        <div className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={faAddressCard} className={`text-2xl ${darkMode? "text-white" : " text-[#0F3B57]"}`} />
                            <label htmlFor="cargo-funcao" className={`text-xl font-medium ${darkMode? "text-white" : " text-[#0F3B57]"}`}>Cargo/Função</label>
                        </div>
                        <input type="text" name="cargo-funcao" placeholder={`${user?.role}`} className={`border-1 w-full p-[0.4rem] bg-white border-[#082640] rounded-md mt-[0.6rem] mb-[1.4rem] ${darkMode? "placeholder-[#90929c] border-white" : "border-[#082640]"}`}/>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col w-[47%]">
                                <div className="flex flex-row items-center gap-2">
                                    <FontAwesomeIcon icon={faEnvelope} className={`text-2xl ${darkMode? "text-white" : " text-[#0F3B57]"}`}/>
                                    <label htmlFor="email" className={`text-xl font-medium ${darkMode? "text-white" : " text-[#0F3B57]"}`}>Email</label>
                                </div>
                                <input type="text" name="email" placeholder={`${user?.email}`} className={`border-1 w-full p-[0.4rem] bg-white border-[#082640] rounded-md mt-[0.6rem] mb-[1.4rem] ${darkMode? "placeholder-[#90929c] border-white" : "border-[#082640]"}`}/>
                            </div>
                            <div className="flex flex-col w-[47%]">
                                <div className="flex flex-row items-center gap-2">
                                    <FontAwesomeIcon icon={faPhone} className={`text-2xl ${darkMode? "text-white" : " text-[#0F3B57]"}`}/>
                                    <label htmlFor="telefone" className={`text-xl font-medium ${darkMode? "text-white" : " text-[#0F3B57]"}`}>Telefone</label>
                                </div>
                                <input type="tel" name="telefone" placeholder={`${user?.phone}`} className={`border-1 w-full p-[0.4rem] bg-white border-[#082640] rounded-md mt-[0.6rem] mb-[1.4rem] ${darkMode? "placeholder-[#90929c] border-white" : "border-[#082640]"}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                {statusAll && (
                    <div className={`${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-white"} w-[93%] rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.15)] px-12 py-9 mt-10`}>
                        <h2 className={`font-bold text-3xl underline text-left mb-9 ${darkMode ? "text-white" : "text-[#082640]"}`}>Estatísticas</h2>
                        <div className="grid grid-cols-2 gap-6 text-lg">
                        <div className={`rounded-lg py-10 px-6 ${darkMode ? "bg-[#182039]" : "bg-[#F5F5F5]"}`}>
                            <div className="flex flex-col gap-0 mb-7">
                                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-[#082640]"} text-2xl mb-2 text-left pb-0`}>Geral</h3>
                                <hr/>
                            </div>
                            <div className="flex flex-col items-center mb-7">
                                <span className={`text-6xl font-bold ${darkMode ? "text-white" : "text-[#082640]"}`}>{statusAll.total}</span>
                                <p className="text-[#90929c]">Total de Análises</p>
                            </div>
                            <div className="mb-10">
                                <ProgressBar label="Taxa de Sucesso" value={statusAll.done} total={statusAll.total}></ProgressBar>
                            </div>
                            <div className="flex flex-col gap-4">
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3">
                                    <img
                                        src={darkMode ? "/check-circle-white.png" : "/check-circle.svg"}
                                        alt="icone_sucesso"
                                        className="w-[1.8rem]"
                                    />
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Sucesso</span>
                                </div>
                                <span className="text-[#19A603]">{statusAll.done}</span>
                            </div>
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon icon={faCircleExclamation} className={`text-[1.8rem] ${darkMode ? "text-white" : "text-black"}`}/>
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Falha</span>
                                </div>
                                <span className="text-[#BF0F0F]">{statusAll.failed}</span>
                            </div>
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon icon={faSpinner} className={`text-[1.8rem] ${darkMode ? "text-white" : "text-black"}`}/>
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Em andamento</span>
                                </div>
                                <span className={`${darkMode ? "text-white" : "text-[#0E3C56]"}`}>{statusAll.processing}</span>
                            </div>
                            </div>
                        </div>
                        {statusMonth && (
                            <div className={`rounded-lg py-10 px-6 ${darkMode ? "bg-[#182039]" : "bg-[#F5F5F5]"}`}>
                            <div className="flex flex-col gap-0 mb-7">
                                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-[#082640]"} text-2xl mb-2 text-left pb-0`}>Este mês</h3>
                                <hr/>
                            </div>
                            <div className="flex flex-col items-center mb-7">
                                <span className={`text-6xl font-bold ${darkMode ? "text-white" : "text-[#082640]"}`}>{statusMonth.total}</span>
                                <p className="text-[#90929c]">Total de Análises</p>
                            </div>
                            <div className="mb-10">
                                <ProgressBar label="Taxa de Sucesso" value={statusMonth.done} total={statusMonth.total}></ProgressBar>
                            </div>
                            <div className="flex flex-col gap-4">
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3">
                                    <img
                                        src={darkMode ? "/check-circle-white.png" : "/check-circle.svg"}
                                        alt="icone_sucesso"
                                        className="w-[1.8rem]"
                                    />
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Sucesso</span>
                                </div>
                                <span className="text-[#19A603]">{statusMonth.done}</span>
                            </div>
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon icon={faCircleExclamation} className={`text-[1.8rem] ${darkMode ? " text-white" : "text-black"}`}/>
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Falha</span>
                                </div>
                                <span className="text-[#BF0F0F]">{statusMonth.failed}</span>
                            </div>
                            <div className={`flex flex-row justify-between px-6 py-3 rounded-lg border-1 border-[#aeb0b5] ${darkMode ? "bg-[#182039]" : "bg-white"}`}>
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon icon={faSpinner} className={`text-[1.8rem] ${darkMode ? "text-white" : "text-black"}`}/>
                                    <span className={`${darkMode ? "text-white" : "text-[#182039]"}`}>Em andamento</span>
                                </div>
                                <span className={`${darkMode ? "text-white" : "text-[#0E3C56]"}`}>{statusMonth.processing}</span>
                            </div>
                            </div>
                        </div>
                        )}
                        </div>
                    </div>
                )}
            </div>
            <div className={`flex flex-row items-center justify-end px-13 mt-10 gap-7 ${darkMode ? "bg-[#010A26]" : ""}`}>
                <button onClick={toggleTheme} className={`relative w-24 h-8 rounded-full flex items-center transition-colors duration-300 ${darkMode ? "bg-[#0F3B56]" : "bg-[#FEDA60]"}`}>
                    <div className={`absolute bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-0" : "translate-x-16"}`}></div>
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className={`absolute text-white transition-all duration-300 text-xl ${darkMode ? "right-2" : "left-2"}`}/>
                </button>
                <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-red-700 transition flex flex-row gap-2 items-center"> 
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Sair da conta
                </button>
            </div>
        </div>
    );
};

export default AccountPage;