import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import Login from '../pages/login';
import * as ROUTE from '../constants/routes';
import { login } from '../services/services';

const mock_history_push = jest.fn();

jest.mock('../services/services');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mock_history_push
  })
}));


describe('<Login />', () => {
beforeEach(() => { jest.clearAllMocks(); })

    // :)

    test('Login page with a form submissions and logs the user in', async () => {

      login.mockImplementation(() => ({ data: { success: { check: true }}}));
        
        render (
            <BrowserRouter>
            <Login />
            </BrowserRouter>
        );

        const submit         = screen.getByRole('button', { type: /submit/i });
        const username_input = screen.getByPlaceholderText(/Enter your User Name/i);
        const password_input = screen.getByPlaceholderText(/Enter password/i);

        user.type(username_input, 'zin');
        user.type(password_input, '12345');
        
        expect(username_input.getAttribute('value')).toEqual('zin');
        expect(password_input.getAttribute('value')).toEqual('12345')
        
        user.click(submit);

        await waitFor(() => {
          expect(mock_history_push).toBeCalledWith(ROUTE.DASHBOARD);
        })

    })


    // :(

    test('Login page with a form submissions with incorrcet credentials', async () => {
      
      login.mockImplementation(() => { throw new Error('incorrect credentials')});
        
      render (
          <BrowserRouter>
          <Login />
          </BrowserRouter>
      );

      const submit         = screen.getByRole('button', { type: /submit/i });
      const username_input = screen.getByPlaceholderText(/Enter your User Name/i);
      const password_input = screen.getByPlaceholderText(/Enter password/i);
      
      user.type(username_input, 'in');
      user.type(password_input, '45');
      
      expect(username_input.getAttribute('value')).not.toEqual('zin');
      expect(password_input.getAttribute('value')).not.toEqual('12345')
      
      user.click(submit);
      
      await waitFor(() => {
        const error_message = screen.queryByRole('log');

        expect(error_message).toBeInTheDocument();
        expect(screen.getByText(/Error: incorrect credentials/i)).toBeInTheDocument();
        expect(mock_history_push).not.toBeCalled();
      })
    })
})