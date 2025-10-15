import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountdownTimer from "./CountdownTimer";

describe("CountdownTimer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
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
    
    expect(screen.getByTestId("timer-display").textContent).toContain("5");
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("timer-display").textContent).toContain("4");
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("timer-display").textContent).toContain("3");
  });

  test("se detiene en 0", () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input");
    const startButton = screen.getByTestId("start-button");
    
    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(screen.getByTestId("timer-display").textContent).toContain("0");
  });

  test("permite reiniciar el contador", () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input") as HTMLInputElement;
    const startButton = screen.getByTestId("start-button");
    const resetButton = screen.getByTestId("reset-button");
    
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    fireEvent.click(resetButton);
    
    expect(screen.getByTestId("timer-display").textContent).toContain("0");
    expect(input.value).toBe("");
  });

  test("deshabilita el input mientras el contador está activo", () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId("seconds-input") as HTMLInputElement;
    const startButton = screen.getByTestId("start-button");
    
    expect(input.disabled).toBe(false);
    
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(startButton);
    
    expect(input.disabled).toBe(true);
  });
});