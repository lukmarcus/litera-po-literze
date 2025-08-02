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

  it("renders app and pack language buttons", () => {
    render(
      <LanguageMenuSection
        appLanguage="en"
        packLanguage="pl"
        setAppLanguage={() => {}}
        setPackLanguage={() => {}}
        translations={translations}
      />
    );
    expect(screen.getByText(/app language/i)).toBeInTheDocument();
    expect(screen.getByText(/pack language/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /EN/i })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /PL/i })[0]
    ).toBeInTheDocument();
  });

  it("calls setAppLanguage when app language button is clicked", () => {
    const setAppLanguage = vi.fn();
    render(
      <LanguageMenuSection
        appLanguage="pl"
        packLanguage="pl"
        setAppLanguage={setAppLanguage}
        setPackLanguage={() => {}}
        translations={translations}
      />
    );
    fireEvent.click(screen.getAllByRole("button", { name: /EN/i })[0]);
    expect(setAppLanguage).toHaveBeenCalled();
  });

  it("calls setPackLanguage when pack language button is clicked", () => {
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
    fireEvent.click(screen.getAllByRole("button", { name: /PL/i })[1]);
    expect(setPackLanguage).toHaveBeenCalled();
  });
});
