import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * Định nghĩa cho một cột trong bảng.
 * @template T - Kiểu dữ liệu của một hàng.
 * @property {keyof T | string} accessorKey - Khóa để truy cập dữ liệu trong object của hàng.
 * @property {string} header - Tiêu đề của cột.
 * @property {(item: T) => React.ReactNode} [cell] - (Tùy chọn) Hàm để render nội dung ô. Nếu không có, sẽ hiển thị giá trị mặc định.
 * @property {string} [headerClassName] - (Tùy chọn) Class CSS cho tiêu đề cột.
 * @property {string} [cellClassName] - (Tùy chọn) Class CSS cho các ô trong cột.
 */
export interface ColumnDef<T> {
  accessorKey: keyof T | string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface CommonTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

const CommonTable = <T extends { id: string | number }>({
  columns,
  data,
}: CommonTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-muted'>
          {columns.map((col) => (
            <TableHead
              key={String(col.accessorKey)}
              className={col.headerClassName}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id} className={`cursor-pointer`}>
            {columns.map((col) => (
              <TableCell
                key={String(col.accessorKey)}
                className={col.cellClassName}
              >
                {col.cell
                  ? col.cell(item)
                  : (item[col.accessorKey as keyof T] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommonTable;
