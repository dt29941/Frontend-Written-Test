import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import MainSection, { Course } from './mainSection';

// Mock useMediaQuery to control mobile/desktop behavior
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('MainSection Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useMediaQuery as jest.Mock).mockReset();
  });



  // test case 1: search test input
  test('filters courses based on search term', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // find the search input
    const searchInput = screen.getByPlaceholderText('Search');

    // simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Crypto Trading' } });

    // wait for debounce to apply
    await waitFor(() => {
      expect(screen.getByText('Introduction to Crypto Trading')).toBeInTheDocument();
      expect(screen.queryByText('Introduction to Crypto Mining')).not.toBeInTheDocument();
      expect(screen.queryByText('DeFi and Smart Contracts')).not.toBeInTheDocument();
    });
  });

  // test case 2: test empty search result
  test('shows no courses when search term does not match', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // Simulate typing a non-matching search term
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent Course' } });

    // Wait for debounce to apply
    await waitFor(() => {
      expect(screen.queryByText('Introduction to Crypto Trading')).not.toBeInTheDocument();
      expect(screen.queryByText('DeFi and Smart Contracts')).not.toBeInTheDocument();
    });
  });

  // test case 3: test mobile view layout
  test('applies centered layout on mobile view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Mobile view
    render(<MainSection />);

    // check if the grid containers justify content center
    const grids = screen.getAllByTestId('MuiGrid-container'); // Add data-testid="MuiGrid-container" to Grid in the component
    grids.forEach((grid) => {
      expect(grid).toHaveStyle('justify-content: center');
    });
  });


});