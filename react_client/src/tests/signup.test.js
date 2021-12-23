import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import Signup from '../pages/signup';
import * as ROUTE from '../constants/routes';
import { signup } from '../services/services';

const mock_history_push = jest.fn();

jest.mock('../services/services');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mock_history_push
  })
}));


describe('<Signup />', () => {
beforeEach(() => { jest.clearAllMocks(); })

    test('Signup page with a form submissions and user create an account', async () => {

      signup.mockImplementation(() => (true));
        
        render (
            <BrowserRouter>
            <Signup />
            </BrowserRouter>
        );

        const submit         = screen.getByRole('button', { type: /submit/i });
        const username_input = screen.getByPlaceholderText(/Enter your User Name/i);
        const password_input = screen.getByPlaceholderText(/Enter your Password/i);

        user.type(username_input, 'new-user');
        user.type(password_input, '12345');
        
        expect(username_input.getAttribute('value')).toEqual('new-user');
        expect(password_input.getAttribute('value')).toEqual('12345')
        
        user.click(submit);

        await waitFor(() => {
          expect(mock_history_push).toBeCalledWith(ROUTE.LOGIN);
        })
    })



    test('Signup page with a form submissions with unapproved username', async () => {
      
      signup.mockImplementation(() => { throw new Error() });
        
      render (
          <BrowserRouter>
          <Signup />
          </BrowserRouter>
      );

      const submit         = screen.getByRole('button', { type: /submit/i });
      const username_input = screen.getByPlaceholderText(/Enter your User Name/i);
      const password_input = screen.getByPlaceholderText(/Enter your Password/i);
      
      user.type(username_input, 'unapproved');
      user.type(password_input, '12345');
      
      expect(username_input.getAttribute('value')).toEqual('unapproved');
      expect(password_input.getAttribute('value')).toEqual('12345')
      
      user.click(submit);
      
      await waitFor(() => {
        const error_message = screen.queryByRole('log');

        expect(error_message).toBeInTheDocument();
        expect(screen.getByText(/username are invalid../i)).toBeInTheDocument();
        expect(mock_history_push).not.toBeCalled();
      })
    })
})