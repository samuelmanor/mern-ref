import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from "./blog";

describe('<Blog />', () => {
    let component;
    let mockHandler;

    beforeEach(() => {
        const blog = {
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

        component = render(<Blog blog={blog} handleUpdate={mockHandler} />)
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

    test('clicking the like button calls the event handler correctly', async () => {
        const user = userEvent.setup();

        const viewBtn = component.container.querySelector('#view-btn');
        await user.click(viewBtn);

        const likeBtn = component.container.querySelector('#like-btn');
        await user.click(likeBtn);

        expect(mockHandler.mock.calls).toHaveLength(1);
    })
});