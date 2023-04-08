import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from "./blog";

describe('<Blog />', () => {
    let blog;
    let component;

    beforeEach(() => {
        blog = {
            title: 'lorem ipsum dolor sit amet',
            author: 'john smith',
            url: 'www.website.com',
            user: {
                id: '6430c666b6ce277a98f02419',
                name: 'Superuser',
                username: 'root'
            }
        };

        mockHandler = jest.fn();

        component = render(<Blog blog={blog}  />)
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent('lorem ipsum dolor sit amet');
        
        expect(component.container).not.toHaveTextContent('likes');
    });

    test('url and likes are shown when view button is clicked', async () => {
        const user = userEvent.setup();
        const viewBtn = component.container.querySelector('#view-btn');
        await user.click(viewBtn);

        expect(component.container).toHaveTextContent('john smith');
    });
});