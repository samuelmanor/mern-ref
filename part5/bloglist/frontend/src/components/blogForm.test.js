import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import BlogForm from "./blogform";

describe('<BlogForm />', () => {
    test('form calls event handler with right details', async() => {
        const createBlog = jest.fn();
        const user = userEvent.setup();

        const component = render(<BlogForm handleCreateBlog={createBlog} />);

        const titleInput = component.container.querySelector('#title-input');
        const authorInput = component.container.querySelector('#author-input');
        const urlInput = component.container.querySelector('#url-input');

        const postBtn = component.container.querySelector('#post-blog-btn');

        await user.type(titleInput, 'lorem ipsum');
        await user.type(authorInput, 'john smith');
        await user.type(urlInput, 'www.website.com');
        await user.click(postBtn);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('lorem ipsum');
    });
});