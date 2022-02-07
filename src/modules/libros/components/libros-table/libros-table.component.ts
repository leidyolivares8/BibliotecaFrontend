import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Libro } from '@modules/libros/models';
import { LibroService } from '@modules/libros/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-libros-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './libros-table.component.html',
    styleUrls: ['libros-table.component.scss'],
})
export class LibrosTableComponent implements OnInit {
    @Input() pageSize = 10;

    libros$!: Observable<Libro[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public libroService: LibroService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.libroService.pageSize = this.pageSize;
        this.libros$ = this.libroService.libros$;
        this.total$ = this.libroService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.libroService.sortColumn = column;
        this.libroService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
}
