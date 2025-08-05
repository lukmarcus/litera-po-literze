import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Game from "./game";
import type { WordPack } from "@types";
const playMock = vi.fn(() => Promise.resolve());
class MockAudio {
  src: string;
  play = playMock;
  pause = vi.fn();
  currentTime = 0;
  oncanplaythrough: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(src: string) {
    this.src = src;
    MockAudio.instances.push(this);
  }
  static instances: MockAudio[] = [];
}
beforeEach(() => {
  // @ts-ignore
  global.Audio = MockAudio;
  MockAudio.instances = [];
  playMock.mockClear();
});

const mockWordPack: WordPack = {
  id: "test",
  name: { pl: "Test", en: "Test" },
  language: "en",
  type: "test",
  words: [{ word: "cat" }, { word: "dog" }],
};

describe("Game", () => {
  it("renders current word and image", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    expect(screen.getByText(/current word/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("shows congratulations after all words are completed and plays success audio", () => {
    render(
      <Game
        wordPack={{ ...mockWordPack, words: [{ word: "a" }] }}
        language="en"
        onBackToMenu={() => {}}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a" } });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
    const audioInstance = MockAudio.instances.find((a) =>
      a.src.includes("/audio/effects/success.mp3")
    );
    expect(audioInstance).toBeDefined();
    expect(playMock).toHaveBeenCalled();
  });

  it("calls onBackToMenu when menu button is confirmed", () => {
    const onBackToMenu = vi.fn();
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={onBackToMenu} />
    );
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /yes, return to menu/i })
    );
    expect(onBackToMenu).toHaveBeenCalled();
  });

  it("shows error message and plays error audio on wrong answer", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "wrong" },
    });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(document.querySelector(".letter-slot.active.error")).toBeTruthy();
    const errorAudio = MockAudio.instances.find((a) =>
      a.src.includes("/audio/effects/error.mp3")
    );
    expect(errorAudio).toBeDefined();
    expect(playMock).toHaveBeenCalled();
  });

  it("shows next word after correct answer", async () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    for (const letter of "cat") {
      fireEvent.keyDown(window, { key: letter });
    }
    fireEvent.keyDown(window, { key: "Enter" });
    await screen.findByText((content, el) => {
      return (
        !!el && el.className.includes("debug-word") && /dog/i.test(content)
      );
    });
  });

  it("clears input after correct answer", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "cat" } });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(input).toHaveValue("");
  });

  it("accepts Enter key for submitting answer", async () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    for (const letter of "cat") {
      fireEvent.keyDown(window, { key: letter });
    }
    fireEvent.keyDown(window, { key: "Enter" });
    await waitFor(() => {
      const debugWord = document.querySelector(".debug-word");
      expect(debugWord).toBeTruthy();
      const text = debugWord?.textContent?.replace(/\s+/g, " ").trim();
      expect(text).toMatch(/dog/i);
    });
  });

  it("does not call onBackToMenu when modal is cancelled", () => {
    const onBackToMenu = vi.fn();
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={onBackToMenu} />
    );
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    // Cancel modal (przycisk Cancel zamiast No/Nie)
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onBackToMenu).not.toHaveBeenCalled();
  });

  it("shows correct image for each word", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "cat" } });
    fireEvent.keyDown(window, { key: "Enter" });
    const img = screen.getByRole("img");
    expect(["cat", "dog"]).toContain(img.getAttribute("alt"));
  });
});
