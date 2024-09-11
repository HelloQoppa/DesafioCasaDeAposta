export interface Cliente {
    id?: number;
    nomeCompleto: string;
    emails: string[];
    telefones: string[];
    dataRegistro?: Date;
}
