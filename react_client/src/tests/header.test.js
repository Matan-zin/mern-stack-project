import React from "react";
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import Header from "../components/Header";
import * as ROUTES from '../constants/routes';

const mock_history_push = jest.fn();

jest.mock('../services/services');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mock_history_push
    })
  }));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ admin: true })
}))

describe('<Header />', () => {

    test('render Header component and click logout button', () => {
        render(
            <BrowserRouter>
            <Header username={'zin'}/>
            </BrowserRouter>
        )

        expect(screen.getByText(/zin/i)).toBeInTheDocument();
        expect(screen.getByText(/Movies/i)).toBeInTheDocument();
        expect(screen.getByText(/Subscriptions/i)).toBeInTheDocument();
        expect(screen.getByText(/Users Managment/i)).toBeInTheDocument();

        const [logout] = screen.queryAllByRole('button', { label: /log out/i });

        user.click(logout);
        expect(mock_history_push).toHaveBeenCalledWith(ROUTES.LOGIN);
    })
});