import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PackMenuSection from "./packMenuSection";

describe("PackMenuSection", () => {
  const mockWordPacks = [
    {
      id: "1",
      name: { en: "Pack 1", pl: "Paczka 1" },
      language: "en",
      type: "test" as const,
      words: [],
    },
    {
      id: "2",
      name: { en: "Pack 2", pl: "Paczka 2" },
      language: "en",
      type: "test" as const,
      words: [],
    },
  ];
  const translations = {
    selectPacks: "Select packs",
    play: "Play",
    back: "Back",
    noPacksForLanguage: "No packs for language",
    selectAtLeastOnePack: "Select at least one pack",
  };

  it("renders list of packs with checkboxes", () => {
    render(
      <PackMenuSection
        wordPacks={mockWordPacks}
        checked={[true, false]}
        setChecked={() => {}}
        onSelectPack={() => {}}
        translations={translations}
        language="en"
        onBack={() => {}}
      />
    );
    expect(screen.getByLabelText(/Pack 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pack 2/i)).toBeInTheDocument();
  });

  it("calls setChecked when checkbox is clicked", () => {
    const setChecked = vi.fn();
    render(
      <PackMenuSection
        wordPacks={mockWordPacks}
        checked={[true, false]}
        setChecked={setChecked}
        onSelectPack={() => {}}
        translations={translations}
        language="en"
        onBack={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText(/Pack 2/i));
    expect(setChecked).toHaveBeenCalled();
  });

  it("calls onSelectPack on submit if at least one pack is checked", () => {
    const onSelectPack = vi.fn();
    render(
      <PackMenuSection
        wordPacks={mockWordPacks}
        checked={[true, false]}
        setChecked={() => {}}
        onSelectPack={onSelectPack}
        translations={translations}
        language="en"
        onBack={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onSelectPack).toHaveBeenCalled();
  });

  it("shows message when no packs for language", () => {
    render(
      <PackMenuSection
        wordPacks={[]}
        checked={[]}
        setChecked={() => {}}
        onSelectPack={() => {}}
        translations={translations}
        language="en"
        onBack={() => {}}
      />
    );
    expect(screen.getByText(/no packs for language/i)).toBeInTheDocument();
  });
});
