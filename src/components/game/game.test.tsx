
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Game from './game';
import type { WordPack } from '@types';

// Mock Audio to track play calls and src
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
  id: 'test',
  name: { pl: 'Test', en: 'Test' },
  language: 'en',
  type: 'test',
  words: [
    { word: 'cat' },
    { word: 'dog' },
  ],
};

describe('Game', () => {
  it('renders current word and image', () => {
    render(
      <Game
        wordPack={mockWordPack}
        language="en"
        onBackToMenu={() => {}}
      />
    );
    expect(screen.getByText(/current word/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows congratulations after all words are completed and plays success audio', () => {
    render(
      <Game
        wordPack={{ ...mockWordPack, words: [{ word: 'a' }] }}
        language="en"
        onBackToMenu={() => {}}
      />
    );
    // Simulate correct input
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
    // Check if success audio was played with correct src
    const audioInstance = MockAudio.instances.find(a => a.src.includes('/audio/effects/success.mp3'));
    expect(audioInstance).toBeDefined();
    expect(playMock).toHaveBeenCalled();
  });

  it('calls onBackToMenu when menu button is confirmed', () => {
    const onBackToMenu = vi.fn();
    render(
      <Game
        wordPack={mockWordPack}
        language="en"
        onBackToMenu={onBackToMenu}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    // Confirm modal
    fireEvent.click(screen.getByRole('button', { name: /yes, return to menu/i }));
    expect(onBackToMenu).toHaveBeenCalled();
  });
});
