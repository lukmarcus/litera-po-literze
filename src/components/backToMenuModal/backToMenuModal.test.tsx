import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BackToMenuModal from "./backToMenuModal";

describe("BackToMenuModal", () => {
  it("renders custom button labels", () => {
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        confirmLabel="Potwierdź"
        cancelLabel="Odrzuć"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: /potwierdź/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /odrzuć/i })).toBeInTheDocument();
  });

  it("does not render message if not provided", () => {
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });
  it("does not render when open is false", () => {
    render(
      <BackToMenuModal
        open={false}
        title="Test Title"
        message="Test Message"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("renders title, message, and buttons when open is true", () => {
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /anuluj/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  it("calls onCancel when overlay is clicked", () => {
    const onCancel = vi.fn();
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    fireEvent.click(document.querySelector(".confirm-modal-overlay")!);
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onCancel when close button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /zamknij/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /anuluj/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(
      <BackToMenuModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /ok/i }));
    expect(onConfirm).toHaveBeenCalled();
  });
});
