import { useState, type ChangeEvent, type FormEvent } from "react";
import { wsService } from "../api/websocket";

export default function ClassificationPage() {
    const [formData, setFormData] = useState({
        description: "",
        manufacturer: "",
        supplier: "",
        partnumber: ""
    });

    // Handler genérico para atualizar qualquer campo
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
        try {
            await wsService.startClassificationProcess(formData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md mx-auto p-4"
        >
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Descrição do Produto
                </label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="descrição do produto"
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Fabricante
                </label>
                <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="fabricante do produto"
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Fornecedor
                </label>
                <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="fornecedor do produto"
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Partnumber
                </label>
                <input
                    type="text"
                    name="partnumber"
                    value={formData.partnumber}
                    onChange={handleChange}
                    placeholder="partnumber"
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Enviar
            </button>
        </form>
    );
}
