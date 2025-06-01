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

  // Test 1: Check if the component renders correctly
  test('renders the MainSection component with course cards', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // Check if the section headers are rendered
    expect(screen.getByText('Your Learning')).toBeInTheDocument();
    expect(screen.getByText('Popular Courses')).toBeInTheDocument();

    // Check if course titles are rendered
    expect(screen.getByText('Introduction to Crypto Trading')).toBeInTheDocument();
    expect(screen.getByText('DeFi and Smart Contracts')).toBeInTheDocument();
  });

  // Test 2: Test search functionality
  test('filters courses based on search term', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // Find the search input
    const searchInput = screen.getByPlaceholderText('Search');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Crypto Trading' } });

    // Wait for debounce to apply
    await waitFor(() => {
      expect(screen.getByText('Introduction to Crypto Trading')).toBeInTheDocument();
      expect(screen.queryByText('Introduction to Crypto Mining')).not.toBeInTheDocument();
      expect(screen.queryByText('DeFi and Smart Contracts')).not.toBeInTheDocument();
    });
  });

  // Test 3: Test empty search result
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

  // Test 4: Test mobile view layout
  test('applies centered layout on mobile view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Mobile view
    render(<MainSection />);

    // Check if the Grid containers have centered justification
    const grids = screen.getAllByTestId('MuiGrid-container'); // Add data-testid="MuiGrid-container" to Grid in the component
    grids.forEach((grid) => {
      expect(grid).toHaveStyle('justify-content: center');
    });
  });

  // Test 5: Test card hover effect
  test('applies hover effect on course cards', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // Find a course card
    const card = screen.getByText('Introduction to Crypto Trading').closest('div');
    expect(card).toBeInTheDocument();

    // Simulate hover (using CSS pseudo-class is tricky, so we check if the transition style is applied)
    expect(card).toHaveStyle('transition: transform 0.3s');
  });

  // Test 6: Test image rendering
  test('renders course images correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop view
    render(<MainSection />);

    // Check if images are rendered with correct alt text
    const cryptoTradingImage = screen.getByAltText('Introduction to Crypto Trading');
    const defiImage = screen.getByAltText('DeFi and Smart Contracts');

    expect(cryptoTradingImage).toHaveAttribute('src', '/course-1.png');
    expect(defiImage).toHaveAttribute('src', '/popular-1.png');
  });
});