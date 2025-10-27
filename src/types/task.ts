import type Classification from "./classification";

export default interface Task {
    id: string;
    job_id: string;
    room_id: string;
    user_id: number;
    status: string;
    current: number;
    total: number;
    message: string;
    created_at: Date;
    updated_at?: Date;
    classifications: Classification[]
}