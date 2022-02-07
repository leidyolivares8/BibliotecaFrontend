export interface Libro {
    [key: string]: string | number | boolean;
    _id: string;
    titulo: string;
    autor: string;
    anio: number;
    editorial: string;
    categoria: string;
    idioma: string;
    ubicacion: string;
    disponible: boolean;
}