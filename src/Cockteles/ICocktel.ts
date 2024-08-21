import { IBar } from "../Bares/IBar";

export interface ICocktel {
    id?: string;
    nombre: string;
    nombreCategoria: string;
    informacion: string;
    ingredientes: string;
    instrucciones: string;
    nombreVidrio: string;
    urlFoto: string;
    disponibleBar?: IBar[];
}