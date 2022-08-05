import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import MenuBar from '../MenuBar';

describe('<Menubar>', () => {
    test('should render the button', () => {
        render(
            <BrowserRouter>
                <MenuBar />
            </BrowserRouter>
        )
        const button = screen.getByRole('button', { name: /Home/i })
        fireEvent.click(button)
    })
})