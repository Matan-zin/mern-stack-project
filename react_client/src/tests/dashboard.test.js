import React from "react";
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { get_data } from "../services/services";
import { act } from "react-dom/test-utils";

jest.mock('../services/services');

describe('<Dashboard />', () => {
    
    test('should load dashboard page', async () => {
        await act( async() => {
            get_data.mockImplementation(() => ( { data: {id:"017ed254-d960-4e10-9abe-83751f00e042", admin:true} }))
            
            render (
                <BrowserRouter>
                <Dashboard />
                </BrowserRouter>
            )
            
            expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
            expect(screen.getByRole('img', { alt: 'projector' })).toBeInTheDocument();
        })     
    })
});