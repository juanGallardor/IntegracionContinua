import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker from "./ColorPicker";

describe("ColorPicker Component", () => {
  beforeEach(() => {
    // Mock localStorage
    let store: Record<string, string> = {};
    const localStorageMock = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { 
        store[key] = value.toString(); 
      },
      clear: () => { 
        store = {}; 
      },
      removeItem: (key: string) => { 
        delete store[key]; 
      },
    };
    Object.defineProperty(window, "localStorage", { 
      value: localStorageMock,
      writable: true
    });
  });

  test("muestra el color inicial blanco", () => {
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input") as HTMLInputElement;
    expect(colorInput.value).toBe("#ffffff");
  });

  test("actualiza el color del div al seleccionar un nuevo color", () => {
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    const colorDisplay = screen.getByTestId("color-display");
    
    fireEvent.change(colorInput, { target: { value: "#ff0000" } });
    
    expect(colorDisplay.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  test("guarda el color en localStorage", () => {
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    
    fireEvent.change(colorInput, { target: { value: "#00ff00" } });
    
    expect(localStorage.getItem("selectedColor")).toBe("#00ff00");
  });

  test("carga el color desde localStorage al montar", () => {
    localStorage.setItem("selectedColor", "#0000ff");
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input") as HTMLInputElement;
    expect(colorInput.value).toBe("#0000ff");
  });

  test("muestra el código del color seleccionado", () => {
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    
    fireEvent.change(colorInput, { target: { value: "#abc123" } });
    
    expect(screen.getByText(/ABC123/i)).toBeInTheDocument();
  });
});

//