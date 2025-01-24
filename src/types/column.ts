export type Column<T> = {
  field: keyof T;
  headerName: string;
  width?: number;
  flex?: number;
};