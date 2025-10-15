import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DigitalClock from "./DigitalClock";

describe("DigitalClock Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("muestra la hora en formato HH:MM:SS", () => {
    const mockDate = new Date("2024-10-15T14:30:45");
    jest.setSystemTime(mockDate);
    
    render(<DigitalClock />);
    
    const timeDisplay = screen.getByTestId("time-display");
    expect(timeDisplay.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    expect(timeDisplay.textContent).toBe("14:30:45");
  });

  test("actualiza el tiempo cada segundo", async () => {
    const mockDate = new Date("2024-10-15T14:30:45");
    jest.setSystemTime(mockDate);
    
    render(<DigitalClock />);
    
    expect(screen.getByTestId("time-display").textContent).toBe("14:30:45");
    
    // Avanzar 1 segundo
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(screen.getByTestId("time-display").textContent).toBe("14:30:46");
    });
    
    // Avanzar otro segundo
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(screen.getByTestId("time-display").textContent).toBe("14:30:47");
    });
  });

  test("formatea correctamente los números con ceros a la izquierda", () => {
    const mockDate = new Date("2024-10-15T09:05:03");
    jest.setSystemTime(mockDate);
    
    render(<DigitalClock />);
    
    expect(screen.getByTestId("time-display").textContent).toBe("09:05:03");
  });

  test("limpia el intervalo al desmontar el componente", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    
    const { unmount } = render(<DigitalClock />);
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});