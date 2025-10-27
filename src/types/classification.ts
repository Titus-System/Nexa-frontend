export default interface Classification {
    created_at: Date,
    updated_at?: Date,
    id: number;
    partnumber_id: number;
    classification_task_id: string;
    tipi_id: number;
    manufacturer_id: number;
    manufacturer: {
        created_at: Date;
        updated_at?: Date;
        id: number;
        name: string;
        address: string;
        country: string;
    }
    tipi: {
        created_at: Date;
        updated_at?: Date;
        id: number;
        ncm_id: number;
        ex: string;
        description: string;
        tax: number;
        ncm: {
            created_at: Date;
            updated_at?: Date;
            id: number;
            code: string;
            description: string;
        }
    }
    partnumber: {
        created_at: Date;
        updated_at?: Date;
        id: number;
        code: string;
        best_classification_id: number;
    }
    created_by_user_id: number;
    short_description: string;
    long_description: string;
    status: string;
    confidence_rate: number;
}