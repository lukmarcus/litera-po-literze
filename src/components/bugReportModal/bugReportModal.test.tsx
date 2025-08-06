import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BugReportModal from "./bugReportModal";

describe("BugReportModal", () => {
  it("GitHub and Form links have correct attributes", () => {
    render(<BugReportModal language="en" onClose={() => {}} />);
    const github = screen.getByRole("link", { name: /github/i });
    const form = screen.getByRole("link", { name: /form/i });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(form).toHaveAttribute("target", "_blank");
    expect(form).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders correct texts for different languages", () => {
    render(<BugReportModal language="pl" onClose={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /zgłoś błąd|błąd/i })
    ).toBeInTheDocument();
    render(<BugReportModal language="en" onClose={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /report bug/i })
    ).toBeInTheDocument();
  });

  it("renders title, description and links", () => {
    render(<BugReportModal language="en" onClose={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /report bug/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/choose how to report the problem/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
    expect(screen.getByRole("link", { name: /form/i })).toHaveAttribute(
      "href",
      expect.stringContaining("forms.gle")
    );
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = vi.fn();
    render(<BugReportModal language="en" onClose={onClose} />);
    fireEvent.click(document.querySelector(".modal-overlay")!);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<BugReportModal language="en" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });
});
