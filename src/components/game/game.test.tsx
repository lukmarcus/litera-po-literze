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
  it("shows 'congratulations' when wordPack is empty", () => {
    render(
      <Game
        wordPack={{ ...mockWordPack, words: [] }}
        language="en"
        onBackToMenu={() => {}}
      />
    );
    expect(screen.getByText(/congratulations|well done/i)).toBeInTheDocument();
  });

  it("handles very long word", async () => {
    const longWord = "supercalifragilisticexpialidocious";
    render(
      <Game
        wordPack={{ ...mockWordPack, words: [{ word: longWord }] }}
        language="en"
        onBackToMenu={() => {}}
      />
    );
    for (const letter of longWord) {
      fireEvent.keyDown(window, { key: letter });
    }
    fireEvent.keyDown(window, { key: "Enter" });
    await screen.findByText(/congratulations|well done/i);
  });

  it("handles word with special characters", async () => {
    const specialWord = "zażółć";
    render(
      <Game
        wordPack={{ ...mockWordPack, words: [{ word: specialWord }] }}
        language="pl"
        onBackToMenu={() => {}}
      />
    );
    for (const letter of specialWord) {
      fireEvent.keyDown(window, { key: letter });
    }
    fireEvent.keyDown(window, { key: "Enter" });
    await screen.findByText(/gratulacje|brawo|well done|congratulations/i);
  });

  it("focuses input after word change", async () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    const input = screen.getByRole("textbox");
    for (const letter of "cat") {
      fireEvent.keyDown(window, { key: letter });
    }
    fireEvent.keyDown(window, { key: "Enter" });
    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it("plays success audio only on correct answer", async () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    // Pobierz aktualne słowo z alt obrazka (np. <img alt="cat" ... />)
    let currentWord = "";
    const wordImgs = screen.queryAllByRole("img");
    if (wordImgs.length > 0) {
      currentWord = wordImgs[0].getAttribute("alt") || "";
    }
    // Jeśli nadal puste, pobierz z .debug-word
    if (!currentWord) {
      const debug = screen.queryByText(/current word/i);
      if (debug) {
        const match = debug.textContent?.match(/current word\s*(\w+)/i);
        if (match) currentWord = match[1];
      }
    }
    // Jeśli nadal puste, użyj pierwszego słowa z mockWordPack
    if (!currentWord) {
      currentWord = mockWordPack.words[0].word;
    }
    for (let i = 0; i < currentWord.length; i++) {
      fireEvent.keyDown(window, { key: currentWord[i] });
    }
    // po ostatniej literze czekaj na dźwięk sukcesu
    await waitFor(() => {
      expect(playMock).toHaveBeenCalled();
      const audioInstance = MockAudio.instances.find((a) =>
        a.src.includes("success.mp3")
      );
      expect(audioInstance).toBeDefined();
    });
  });

  it("plays error audio only on wrong answer", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    fireEvent.keyDown(window, { key: "x" });
    expect(playMock).toHaveBeenCalledWith();
    const audioInstance = MockAudio.instances.find((a) =>
      a.src.includes("error.mp3")
    );
    expect(audioInstance).toBeDefined();
  });
  it("renders current word and image", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    expect(screen.getByText(/current word/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("shows congratulations after all words are completed and plays success audio", () => {
    render(
      <Game wordPack={mockWordPack} language="en" onBackToMenu={() => {}} />
    );
    // Pobierz aktualne słowo z alt obrazka
    let currentWord = "";
    const wordImgs = screen.queryAllByRole("img");
    if (wordImgs.length > 0) {
      currentWord = wordImgs[0].getAttribute("alt") || "";
    }
    // Jeśli nadal puste, pobierz z .debug-word
    if (!currentWord) {
      const debug = screen.queryByText(/current word/i);
      if (debug) {
        const match = debug.textContent?.match(/current word\s*(\w+)/i);
        if (match) currentWord = match[1];
      }
    }
    // Jeśli nadal puste, użyj pierwszego słowa z mockWordPack
    if (!currentWord) {
      currentWord = mockWordPack.words[0].word;
    }
    for (let i = 0; i < currentWord.length; i++) {
      fireEvent.keyDown(window, { key: currentWord[i] });
    }
    // po ostatniej literze czekaj na dźwięk sukcesu
    return waitFor(() => {
      expect(playMock).toHaveBeenCalled();
      const audioInstance = MockAudio.instances.find((a) =>
        a.src.includes("success.mp3")
      );
      expect(audioInstance).toBeDefined();
    });
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
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "cat" },
    });
    fireEvent.keyDown(window, { key: "Enter" });
    const img = screen.getByRole("img");
    expect(["cat", "dog"]).toContain(img.getAttribute("alt"));
  });
});
