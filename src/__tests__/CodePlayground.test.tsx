import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodePlayground } from '../components/enterprise/CodePlayground';

// Mock the heavy Monaco editor implementation to avoid loading WebGL in JSDOM
jest.mock('@monaco-editor/react', () => {
  return function MockEditor() {
    return <div data-testid="monaco-editor" />;
  };
});

describe('CodePlayground', () => {
  test('renders Run button and executes code', async () => {
    render(<CodePlayground />);

    const runButton = screen.getByRole('button', { name: /run/i });
    expect(runButton).toBeInTheDocument();

    fireEvent.click(runButton);

    // While the worker runs, the button should show Running…
    expect(runButton).toHaveTextContent(/running/i);
  });
});