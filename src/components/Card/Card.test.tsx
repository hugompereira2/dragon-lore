import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dragon } from "@/types/dragon";
import Card from "./Card";

jest.mock('@/helpers/helpers', () => ({
  formatToBrazilianDate: jest.fn().mockReturnValue('01/01/2020'),
}));

describe("Card Component", () => {
  const dragon: Dragon = {
    id: "1",
    name: "Dragão Fogo",
    type: "Fogo",
    createdAt: '2020-01-01',
  };

  it("renders the Card component correctly", () => {
    render(<Card dragon={dragon} />);
    
    expect(screen.getByText('Dragão Fogo')).toBeInTheDocument();
    
    const fireIcon = screen.getByAltText('Ícone representando o elemento Fogo');
    expect(fireIcon).toBeInTheDocument();
    
    expect(screen.getByText('01/01/2020')).toBeInTheDocument();
  });

  it("displays the correct elemental type and icon for 'Fogo'", () => {
    render(<Card dragon={dragon} />);
    
    const fireIcon = screen.getByAltText('Ícone representando o elemento Fogo');
    expect(fireIcon).toHaveAttribute("src", "/assets/elemental/fire.svg");
    expect(screen.getByText("Fogo")).toBeInTheDocument();
  });

  it("displays the correct elemental type and icon for 'Planta'", () => {
    dragon.type = "Planta";
    render(<Card dragon={dragon} />);
    
    const leafIcon = screen.getByAltText('Ícone representando o elemento Planta');
    expect(leafIcon).toHaveAttribute("src", "/assets/elemental/leaf.svg");
    expect(screen.getByText("Planta")).toBeInTheDocument();
  });

  it("displays the correct elemental type and icon for 'Água'", () => {
    dragon.type = "Água";
    render(<Card dragon={dragon} />);
    
    const waterIcon = screen.getByAltText('Ícone representando o elemento Água');
    expect(waterIcon).toHaveAttribute("src", "/assets/elemental/water.svg");
    expect(screen.getByText("Água")).toBeInTheDocument();
  });

  it("displays the correct elemental type and icon for 'Terra'", () => {
    dragon.type = "Terra";
    render(<Card dragon={dragon} />);
    
    const stoneIcon = screen.getByAltText('Ícone representando o elemento Terra');
    expect(stoneIcon).toHaveAttribute("src", "/assets/elemental/stone.svg");
    expect(screen.getByText("Terra")).toBeInTheDocument();
  });

  it("displays the correct elemental icon for unknown types", () => {
    dragon.type = "Gelo";
    render(<Card dragon={dragon} />);
    
    const unknownIcon = screen.getByAltText('Ícone representando o elemento Gelo');
    expect(unknownIcon).toHaveAttribute("src", "/assets/elemental/unknown.svg");
    expect(screen.getByText("Gelo")).toBeInTheDocument();
  });
});
