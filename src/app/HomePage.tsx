'use client'

import { ActionButton } from "@/components/ActionButton/ActionButton";
import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { EditCreateModal } from "@/components/EditCreateModal/EditCreateModal";
import Navbar from "@/components/Navbar/Navbar";
import { Table } from "@/components/Table/Table";
import { formatToBrazilianDate } from "@/helpers/helpers";
import { fetchDragons } from "@/services/api";
import { Dragon } from "@/types/dragon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [mode, setMode] = useState<'edit' | 'create'>('edit');
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);

  const { data: dragons } = useQuery({
    queryKey: ['fetchDragons'],
    queryFn: () => fetchDragons(),
    refetchOnWindowFocus: false
  })

  const formattedDragons = dragons
  ?.map((dragon) => ({
    ...dragon,
    createdAt: formatToBrazilianDate(dragon.createdAt),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

  const handleEditClick = (dragon: Dragon) => {
    setMode('edit')
    setSelectedDragon(dragon);
    setIsModalOpen(!isModalOpen);
  };

  const handleCreateClick = () => {
    setMode('create')
    setSelectedDragon(null);
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteClick = (dragon: Dragon) => {
    setSelectedDragon(dragon);
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDragon(null);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
    setSelectedDragon(null);
  };

  const columns: { field: keyof Dragon; headerName: string; flex: number; renderCell?: (row: Dragon) => React.ReactNode }[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Nome", flex: 1, renderCell: (row) => <a className="link-underline" href={`/dragon/${row.id}`}>{row.name}</a> },
    { field: "type", headerName: "Tipo", flex: 1 },
    { field: "createdAt", headerName: "Data", flex: 1 },
  ];

  const actions = [
    {
      label: "Editar",
      onClick: handleEditClick,
      className: 'blue-button'
    },
    {
      label: "Deletar",
      onClick: handleDeleteClick,
      className: 'red-button'
    },
  ];

  return (
    <div className="container">
      <EditCreateModal
        open={isModalOpen}
        mode={mode}
        onClose={handleModalClose}
        initialData={selectedDragon}
      />
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        initialData={selectedDragon}
      />
      <Navbar />
      <div className="flex-row-between">
        <h1 className="white-text">Dragões {formattedDragons && formattedDragons?.length > 0 ? `(${formattedDragons?.length})` : null}</h1>
        <ActionButton label="Cadastrar" onClick={handleCreateClick} variant="secondary" />
      </div>
      <Table
        columns={columns}
        data={formattedDragons}
        actions={actions}
        filterPlaceHolder="Filtro por nome"
        filterField="name"
      />
    </div>
  );
}
