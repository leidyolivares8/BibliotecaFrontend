import {Libro} from "./libro";

export interface Respuesta {
    ok: boolean,
    librosDB: Array<Libro>
}