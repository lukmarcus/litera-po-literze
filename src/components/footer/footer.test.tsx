import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './footer';

describe('Footer', () => {
  it('renders version and GitHub link', () => {
    render(<Footer language="en" onReportClick={() => {}} />);
    expect(screen.getByText(/v[0-9.]+/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('renders report bug button with correct label', () => {
    render(<Footer language="en" onReportClick={() => {}} />);
    expect(screen.getByRole('button', { name: /report bug/i })).toBeInTheDocument();
  });

  it('calls onReportClick when report button is clicked', () => {
    const onReportClick = vi.fn();
    render(<Footer language="en" onReportClick={onReportClick} />);
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));
    expect(onReportClick).toHaveBeenCalledTimes(1);
  });
});
