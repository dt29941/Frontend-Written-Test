import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PriceBoard from './priceBoard';
import { setCurrency } from '../../../../lib/features/currencySelect/currencySelectSlice';
import { RootState } from '../../../../lib/store';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';

// Mock Chart.js to prevent rendering issues in Jest
jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

global.fetch = jest.fn() as jest.Mock;

const mockStore = configureStore<RootState>([]);

describe('PriceBoard Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      currencySelect: {
        txt:"BTC",
        coin: 'bitcoin',
        decimal: 2,
        id: 0,
      },
    });
    (global.fetch as jest.Mock).mockClear();
  });

  test('fetches and displays price data', async () => {
    const mockPriceData = {
      prices: [
        [1633035600000, 45000],
        [1633122000000, 46000],
        [1633208400000, 47000],
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPriceData),
    });

    render(
      <Provider store={store}>
        <PriceBoard />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    expect(screen.getByText(/Daily Crypto Prices \(Last 7 days\)/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
    );
  });

  test('handles fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <Provider store={store}>
        <PriceBoard />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    expect(screen.getByText(/Error: Failed to fetch data/)).toBeInTheDocument();
  });

  test('switches currency type', async () => {
    const mockPriceData = {
      prices: [[1633035600000, 45000]],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPriceData),
    });

    render(
      <Provider store={store}>
        <PriceBoard />
      </Provider>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    const ethButton = screen.getByText(/ETH/i);
    fireEvent.click(ethButton);

    const actions = store.getActions() as ReturnType<typeof setCurrency>[];
    expect(actions).toContainEqual(setCurrency({ txt: 'ETH', coin: 'ethereum', decimal: 2, id: 1 }));
  });
});