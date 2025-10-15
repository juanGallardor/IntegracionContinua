import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountdownTimer from "./CountdownTimer";

describe("CountdownTimer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("muestra el tiempo inicial correctamente", () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "10" } });
    
    expect(input.value).toBe("10");
  });

  test("inicia el contador y disminuye cada segundo", async () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input");
    const startButton = screen.getByTestId("start-button");
    
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByTestId("timer-display").textContent).toContain("5");
    });
    
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(screen.getByTestId("timer-display").textContent).toContain("4");
    });
    
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(screen.getByTestId("timer-display").textContent).toContain("3");
    });
  });

  test("se detiene en 0", async () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input");
    const startButton = screen.getByTestId("start-button");
    
    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(startButton);
    
    jest.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(screen.getByTestId("timer-display").textContent).toContain("0");
    });
  });

  test("permite reiniciar el contador", async () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input") as HTMLInputElement;
    const startButton = screen.getByTestId("start-button");
    const resetButton = screen.getByTestId("reset-button");
    
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(startButton);
    
    jest.advanceTimersByTime(3000);
    
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByTestId("timer-display").textContent).toContain("0");
      expect(input.value).toBe("");
    });
  });

  test("deshabilita el input mientras el contador está activo", async () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input") as HTMLInputElement;
    const startButton = screen.getByTestId("start-button");
    
    expect(input.disabled).toBe(false);
    
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(input.disabled).toBe(true);
    });
  });
});