export default interface Classification{
    id: number;
    partnumber_id: number;
    classification_task_id: string;
    tipi_id: number;
    manufacturer_id: number;
    manufacturer: {
        created_at: string;
        updated_at: string;
        id: number;
        name: string;
        address: string;
        country: string;
    }
    tipi: {
        created_at: string;
        updated_at: string;
        id: number;
        ncm_id: number;
        ex: string;
        description: string;
        tax: number;
        ncm: {
            created_at: string;
            updated_at: string;
            id: number;
            code: string;
            description: string;
        }
        partnumber: {
            created_at: string;
            updated_at: string;
            id: number;
            code: string;
            best_classification_id: number;
        }
    }
    created_by_user_id: number;
    short_description: string;
    long_description: string;
    status: string;
    confidence_rate: number;
}