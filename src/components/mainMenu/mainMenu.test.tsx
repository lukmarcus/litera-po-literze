import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MainMenu from "./mainMenu";

describe("MainMenu", () => {
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
    levels: "Levels",
    packs: "Packs",
    howToPlay: "How to play",
    changeLanguage: "Change language",
    selectLevel: "Select level",
    basic: "Basic",
    mixed: "Mixed",
    diacritical: "Diacritical",
    back: "Back",
    selectPacks: "Select packs",
    play: "Play",
    featureUnavailable: "Feature unavailable",
    levelSelected: "Level selected:",
  };

  it("renders main menu buttons", () => {
    render(
      <MainMenu
        wordPacks={mockWordPacks}
        language="en"
        setLanguage={() => {}}
        setPackLanguage={() => {}}
        packLanguage="en"
        onSelectPack={() => {}}
        initialView="main"
      />
    );
    expect(screen.getByText(/levels/i)).toBeInTheDocument();
    expect(screen.getByText(/packs/i)).toBeInTheDocument();
    expect(screen.getByText(/how to play\?/i)).toBeInTheDocument();
    expect(screen.getByText(/language settings/i)).toBeInTheDocument();
  });

  it("changes view to levels after clicking levels button", () => {
    render(
      <MainMenu
        wordPacks={mockWordPacks}
        language="en"
        setLanguage={() => {}}
        setPackLanguage={() => {}}
        packLanguage="en"
        onSelectPack={() => {}}
        initialView="main"
      />
    );
    fireEvent.click(screen.getByText(/levels/i));
    expect(screen.getByText(/select level/i)).toBeInTheDocument();
    expect(screen.getByText(/basic/i)).toBeInTheDocument();
    expect(screen.getByText(/mixed/i)).toBeInTheDocument();
    expect(screen.getByText(/diacritical/i)).toBeInTheDocument();
  });

  it("changes view to packs after clicking packs button", () => {
    render(
      <MainMenu
        wordPacks={mockWordPacks}
        language="en"
        setLanguage={() => {}}
        setPackLanguage={() => {}}
        packLanguage="en"
        onSelectPack={() => {}}
        initialView="main"
      />
    );
    fireEvent.click(screen.getByText(/packs/i));
    expect(screen.getByText(/select word packs/i)).toBeInTheDocument();
    expect(screen.getByText(/pack 1/i)).toBeInTheDocument();
    expect(screen.getByText(/pack 2/i)).toBeInTheDocument();
  });

  it("changes view to language after clicking change language button", () => {
    render(
      <MainMenu
        wordPacks={mockWordPacks}
        language="en"
        setLanguage={() => {}}
        setPackLanguage={() => {}}
        packLanguage="en"
        onSelectPack={() => {}}
        initialView="main"
      />
    );
    fireEvent.click(screen.getByText(/language settings/i));
    expect(screen.getByText(/^app$/i)).toBeInTheDocument();
    expect(screen.getByText(/^packs$/i)).toBeInTheDocument();
  });

  it("calls onSelectPack after selecting packs and clicking play", () => {
    const onSelectPack = vi.fn();
    render(
      <MainMenu
        wordPacks={mockWordPacks}
        language="en"
        setLanguage={() => {}}
        setPackLanguage={() => {}}
        packLanguage="en"
        onSelectPack={onSelectPack}
        initialView="packs"
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onSelectPack).toHaveBeenCalled();
  });
});
