import { Injectable, PipeTransform } from '@angular/core';
import { LIBROS } from '@modules/libros/services/libros';
import { SortDirection } from '@modules/tables/directives';
import { Libro } from '@modules/libros/models';
import { BehaviorSubject, Observable, of, scheduled, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';

interface SearchResult {
    libros: Libro[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string | boolean, v2: number | string | boolean) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(libros: Libro[], column: string, direction: string): Libro[] {
    if (direction === '') {
        return libros;
    } else {
        return [...libros].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(libro: Libro, term: string) {
    return (
      libro.titulo.toLowerCase().includes(term.toLowerCase()) ||
        libro.autor.toLowerCase().includes(term.toLowerCase()) ||
        libro.editorial.toLowerCase().includes(term.toLowerCase()) ||
        libro.categoria.toLowerCase().includes(term.toLowerCase()) ||
        libro.idioma.toLowerCase().includes(term.toLowerCase()) ||
        libro.ubicacion.toLowerCase().includes(term.toLowerCase())
    );
}

@Injectable({ providedIn: 'root' })
export class LibroService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _libros$ = new BehaviorSubject<Libro[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private _librosObv$ = new Observable<Libro[]>();
    private _librosAPI: Libro[];

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private http: HttpClient) {
        // this._search$
        //     .pipe(
        //         tap(() => this._loading$.next(true)),
        //         debounceTime(120),
        //         switchMap(() => this._search()),
        //         delay(120),
        //         tap(() => this._loading$.next(false))
        //     )
        //     .subscribe(result => {
        //         this._libros$.next(result.libros);
        //         this._total$.next(result.total);
        //     });
        this._loading$.next(true)
        this._search();

        //this._search$.next();
        this._librosAPI = new Array();
    }

    get libros$() {
        return this._libros$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search()/*: Observable<SearchResult>*/{
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        let libros = new Array<Libro>();
        let  total = 0;
        this._librosObv$ = this.http.get<Libro[]>(environment.bibliotecaApiEndpoint + "/libro");
        this._librosObv$.subscribe(resp => {
          this._librosAPI = resp

          // 1. sort
          libros = sort(this._librosAPI, sortColumn, sortDirection);

          // 2. filter
          libros = libros.filter(libro => matches(libro, searchTerm));
          total = libros.length;

          // 3. paginate
          libros = libros.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          this._search$.next();
          this._libros$.next(libros);
          this._total$.next(total);
          this._loading$.next(false)
        });

        console.log(libros);
        //return of({ libros, total });
    }
}
