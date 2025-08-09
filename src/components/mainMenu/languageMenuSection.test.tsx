import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LanguageMenuSection from "./languageMenuSection";

describe("LanguageMenuSection", () => {
  const translations = {
    changeLanguage: "Change language",
    changeAppLanguage: "App language",
    changePackLanguage: "Pack language",
  };

  it("renders app and pack language buttons and highlights active ones", () => {
    render(
      <LanguageMenuSection
        appLanguage="en"
        packLanguage="test"
        setAppLanguage={() => {}}
        setPackLanguage={() => {}}
        translations={translations}
      />
    );
    expect(screen.getByText("App language")).toBeInTheDocument();
    expect(screen.getByText("Pack language")).toBeInTheDocument();
    const enButtons = screen.getAllByRole("button", { name: /EN/i });
    expect(enButtons[0]).toHaveClass("lang-active"); // app EN
    expect(enButtons[1]).not.toHaveClass("lang-active"); // packs EN
    const testButton = screen.getByRole("button", { name: /🧪 TEST/i });
    expect(testButton).toHaveClass("lang-active");
    const plButtons = screen.getAllByRole("button", { name: /PL/i });
    expect(plButtons[0]).not.toHaveClass("lang-active"); // app PL
    expect(plButtons[1]).not.toHaveClass("lang-active"); // packs PL
  });

  it("calls setAppLanguage when clicking app language button", () => {
    const setAppLanguage = vi.fn();
    render(
      <LanguageMenuSection
        appLanguage="en"
        packLanguage="en"
        setAppLanguage={setAppLanguage}
        setPackLanguage={() => {}}
        translations={translations}
      />
    );
    const plButtons = screen.getAllByRole("button", { name: /PL/i });
    fireEvent.click(plButtons[0]); // pierwszy PL = app
    expect(setAppLanguage).toHaveBeenCalledWith("pl");
  });

  it("calls setPackLanguage when clicking pack language button", () => {
    const setPackLanguage = vi.fn();
    render(
      <LanguageMenuSection
        appLanguage="en"
        packLanguage="en"
        setAppLanguage={() => {}}
        setPackLanguage={setPackLanguage}
        translations={translations}
      />
    );
    const plButtons = screen.getAllByRole("button", { name: /PL/i });
    fireEvent.click(plButtons[1]); // drugi PL = packs
    expect(setPackLanguage).toHaveBeenCalledWith("pl");
  });

  it("calls setPackLanguage when clicking TEST button", () => {
    const setPackLanguage = vi.fn();
    render(
      <LanguageMenuSection
        appLanguage="en"
        packLanguage="en"
        setAppLanguage={() => {}}
        setPackLanguage={setPackLanguage}
        translations={translations}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /🧪 TEST/i }));
    expect(setPackLanguage).toHaveBeenCalledWith("test");
  });
});
