import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
];

const data: Record<string, React.ReactNode>[] = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
  { id: 3, name: 'Sam Smith', age: 40 },
];

describe('Table', () => {
  it('renders the table with data and columns', () => {
    render(<Table columns={columns} data={data} />);

    columns.forEach(col => {
      expect(screen.getByText(col.headerName)).toBeInTheDocument();
    });

    data.forEach(row => {
      if (typeof row.name === 'string') {
        expect(screen.getByText(row.name)).toBeInTheDocument();
      }
    });
  });

  it('filters data correctly when a filter is applied', () => {
    render(<Table columns={columns} data={data} filterField="name" filterPlaceHolder="Filter by Name" />);

    fireEvent.change(screen.getByPlaceholderText('Filter by Name'), {
      target: { value: 'Jane' },
    });

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).toBeNull();
  });

  it('displays "No data found" message if no data matches the filter', () => {
    render(<Table columns={columns} data={data} filterField="name" filterPlaceHolder="Filter by Name" />);

    fireEvent.change(screen.getByPlaceholderText('Filter by Name'), {
      target: { value: 'Nonexistent Name' },
    });

    expect(screen.getByText('Dados não encontrados')).toBeInTheDocument();
  });

  it('renders actions and triggers them correctly', () => {
    const handleDelete = jest.fn();
    const actions = [
      { label: 'Delete', onClick: handleDelete },
    ];

    render(<Table columns={columns} data={data} actions={actions} />);

    const deleteButtons = screen.getAllByText('Delete');
    deleteButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });

    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
