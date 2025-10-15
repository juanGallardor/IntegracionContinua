import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchList from "./SearchList";

describe("SearchList Component", () => {
  test("muestra todos los elementos inicialmente", () => {
    render(<SearchList />);
    
    const list = screen.getByTestId("names-list");
    expect(list.children).toHaveLength(10);
  });

  test("filtra nombres que coinciden con la búsqueda", () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId("search-input");
    
    fireEvent.change(searchInput, { target: { value: "Ana" } });
    
    expect(screen.getByText("Ana García")).toBeInTheDocument();
    expect(screen.queryByText("Carlos Rodríguez")).not.toBeInTheDocument();
  });

  test("filtra de manera case-insensitive", () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId("search-input");
    
    fireEvent.change(searchInput, { target: { value: "MARÍA" } });
    
    expect(screen.getByText("María López")).toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay coincidencias", () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId("search-input");
    
    fireEvent.change(searchInput, { target: { value: "zzzzz" } });
    
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
    expect(screen.getByText(/No se encontraron resultados/i)).toBeInTheDocument();
  });

  test("muestra múltiples resultados que coinciden", () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId("search-input");
    
    fireEvent.change(searchInput, { target: { value: "a" } });
    
    const list = screen.getByTestId("names-list");
    expect(list.children.length).toBeGreaterThan(1);
  });

  test("actualiza la lista cuando se borra el texto de búsqueda", () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId("search-input");
    
    fireEvent.change(searchInput, { target: { value: "Pedro" } });
    expect(screen.getByTestId("names-list").children).toHaveLength(1);
    
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(screen.getByTestId("names-list").children).toHaveLength(10);
  });
});