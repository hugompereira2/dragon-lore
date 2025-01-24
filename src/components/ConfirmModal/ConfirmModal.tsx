import React, { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { deleteDragon } from "@/services/api";
import Loader from "../Loader/Loader";
import "./style.scss";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  id: string
  name: string;
};

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: FormData | null;
};

export function ConfirmModal({
  open,
  onClose,
  initialData
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    try {
      if (initialData?.id) {
        setIsLoading(true)
        await deleteDragon(initialData.id);
        showAlert("Exclusão realizada com sucesso!", "success");
        queryClient.invalidateQueries({ queryKey: ['fetchDragons'] });

        onClose();
      }
    } catch {
      showAlert("Ocorreu um erro ao excluir.", "error");
    }
    setIsLoading(false)
  };

  return open ? (
    <dialog id="confirm-dialog" className="modal-dialog">
      <section className="modal-content">
        <h2 className="modal-content-title">Confirmar Exclusão</h2>
        <p>{`Tem certeza de que deseja excluir (${initialData?.name})?`}</p>
        <menu className="modal-actions">
          <button
            disabled={isLoading}
            type="button"
            onClick={onClose}
            className="button-secondary"
          >
            Cancelar
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleConfirm}
            className="button-primary"
          >
            {isLoading ? <Loader /> : "Confirmar"}
          </button>
        </menu>
      </section>
    </dialog>
  ) : null;
}
