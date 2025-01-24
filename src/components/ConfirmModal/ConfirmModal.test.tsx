import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";
import { deleteDragon } from "@/services/api";
import { useAlert } from "@/hooks/useAlert";
import '@testing-library/jest-dom';

jest.mock("@/services/api", () => ({
  deleteDragon: jest.fn(),
}));

jest.mock("@/hooks/useAlert", () => ({
  useAlert: jest.fn().mockReturnValue({
    showAlert: jest.fn(),
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn().mockReturnValue({
    invalidateQueries: jest.fn(),
  }),
}));

describe("ConfirmModal", () => {
  const initialData = { id: "1", name: "Dragão Teste" };

  it("renders the modal when open is true", () => {
    render(<ConfirmModal open={true} onClose={jest.fn()} initialData={initialData} />);
    expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza de que deseja excluir (Dragão Teste)?")).toBeInTheDocument();
  });

  it("does not render the modal when open is false", () => {
    render(<ConfirmModal open={false} onClose={jest.fn()} initialData={initialData} />);
    expect(screen.queryByText("Confirmar Exclusão")).toBeNull();
  });

  it("calls onClose when Cancel button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<ConfirmModal open={true} onClose={onCloseMock} initialData={initialData} />);
    
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls deleteDragon and shows success alert when Confirm button is clicked", async () => {
    const showAlertMock = jest.fn();
    (useAlert as jest.Mock).mockReturnValueOnce({ showAlert: showAlertMock });
    const onCloseMock = jest.fn();
    
    render(<ConfirmModal open={true} onClose={onCloseMock} initialData={initialData} />);
    
    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);
    
    await waitFor(() => expect(deleteDragon).toHaveBeenCalledWith("1"));
    
    await waitFor(() => expect(showAlertMock).toHaveBeenCalledWith("Exclusão realizada com sucesso!", "success"));
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("shows a loader while the deletion is in progress", async () => {
    (deleteDragon as jest.Mock).mockResolvedValueOnce(null);
    const onCloseMock = jest.fn();
    
    render(<ConfirmModal open={true} onClose={onCloseMock} initialData={initialData} />);
    
    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);
    
    await waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });

  it("calls showAlert with error message if delete fails", async () => {
    const showAlertMock = jest.fn();
    (useAlert as jest.Mock).mockReturnValueOnce({ showAlert: showAlertMock });
    (deleteDragon as jest.Mock).mockRejectedValueOnce(new Error("Erro ao excluir"));
    const onCloseMock = jest.fn();
    
    render(<ConfirmModal open={true} onClose={onCloseMock} initialData={initialData} />);

    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);
    
    await waitFor(() => expect(showAlertMock).toHaveBeenCalledWith("Ocorreu um erro ao excluir.", "error"));
  });

  it("disables the Confirm button while loading", async () => {
    const onCloseMock = jest.fn();
    (deleteDragon as jest.Mock).mockResolvedValueOnce(null);

    render(<ConfirmModal open={true} onClose={onCloseMock} initialData={initialData} />);

    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);

    expect(confirmButton).toBeDisabled();
  });

});
