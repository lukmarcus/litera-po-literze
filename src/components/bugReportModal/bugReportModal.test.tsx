import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BugReportModal from "./bugReportModal";

describe("BugReportModal", () => {
  // translations pobierane są z globalnego obiektu w komponencie

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
