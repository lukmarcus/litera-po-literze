import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./footer";

describe("Footer", () => {
  it("renders correct version for different languages", () => {
    render(<Footer language="pl" onReportClick={() => {}} />);
    render(<Footer language="en" onReportClick={() => {}} />);
    const versions = screen.getAllByText(/v[0-9.]+/);
    expect(versions.length).toBeGreaterThanOrEqual(2);
  });

  it("GitHub link has correct attributes", () => {
    render(<Footer language="en" onReportClick={() => {}} />);
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("changes label when language changes", () => {
    render(<Footer language="pl" onReportClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: /zgłoś błąd/i })
    ).toBeInTheDocument();
    render(<Footer language="en" onReportClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: /report bug/i })
    ).toBeInTheDocument();
  });
  it("renders version and GitHub link", () => {
    render(<Footer language="en" onReportClick={() => {}} />);
    expect(screen.getByText(/v[0-9.]+/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
  });

  it("renders report bug button with correct label", () => {
    render(<Footer language="en" onReportClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: /report bug/i })
    ).toBeInTheDocument();
  });

  it("calls onReportClick when report button is clicked", () => {
    const onReportClick = vi.fn();
    render(<Footer language="en" onReportClick={onReportClick} />);
    fireEvent.click(screen.getByRole("button", { name: /report bug/i }));
    expect(onReportClick).toHaveBeenCalledTimes(1);
  });
});
