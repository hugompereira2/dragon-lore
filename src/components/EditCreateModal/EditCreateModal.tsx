import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDragon, updateDragon } from "@/services/api";
import "./style.scss";
import { useAlert } from "@/hooks/useAlert";
import Loader from "../Loader/Loader";

type FormData = {
  id?: string
  name: string;
  type: string;
};

type EditCreateModalProps = {
  open: boolean;
  mode: 'edit' | 'create';
  onClose: () => void;
  initialData?: FormData | null;
};

export function EditCreateModal({
  open,
  onClose,
  initialData = { id: "", name: "", type: "" },
  mode
}: EditCreateModalProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData ?? { name: "", type: "" },
  });

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutationDragon.mutate(data);
  };

  const mutationDragon = useMutation({
    mutationFn: (data: FormData) => {
      return mode === 'edit' && initialData?.id
        ? updateDragon(initialData.id, { ...data, 'createdAt': (new Date().toISOString()) })
        : createDragon({ ...data, 'createdAt': (new Date().toISOString()) });
    },
    onSuccess: () => {
      showAlert('Ação realizada com sucesso!', 'success');
      queryClient.invalidateQueries({ queryKey: ['fetchDragons'] });
      reset();
      onClose();
    },

    onError: () => {
      showAlert('error', 'error');
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    open ? (
      <dialog id="edit-create-modal" className="modal-dialog">
        <form className="modal-form" method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <section className="modal-content">
            <h2 className="modal-content-title">
              {initialData?.name ? "Editar Dragão" : "Criar Dragão"}
            </h2>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "O nome é obrigatório" })}
                placeholder="Digite o nome"
              />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="type">Tipo</label>
              <input
                id="type"
                type="text"
                {...register("type", { required: "O tipo é obrigatório" })}
                placeholder="Digite o tipo"
              />
              {errors.type && <p className="error-message">{errors.type.message}</p>}
            </div>
          </section>

          <menu className="modal-actions">
            <button disabled={mutationDragon.isPending} type="button" onClick={onClose} className="button-secondary">
              Cancelar
            </button>
            <button disabled={mutationDragon.isPending} type="submit" className="button-primary">
              {mutationDragon.isPending ? <Loader /> : "Salvar"}
            </button>
          </menu>
        </form>
      </dialog>
    ) : null
  );
}