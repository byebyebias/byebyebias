import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../views/components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router'

jest.mock('../views/assets/CashAppLogo.png', () => 'mocked-logo.png');

describe("Navbar Component", () => {
    const mockedNavigation = jest.fn()
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigation)

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>    
        )
    })

    test("CashApp Logo Home link links to home page", () => {
        const CashAppHomeLink = screen.getByAltText("Bye Bye Bias Home Link")
        fireEvent.click(CashAppHomeLink)
        expect(mockedNavigation).toHaveBeenCalledWith(
            "/", 
            {
                "preventScrollReset": undefined, 
                "relative": undefined, 
                "replace": true, 
                "state": undefined, 
                "viewTransition": undefined
            }
        )
    })

    test("Home link in navbar button links to home page", () => {
        const NavbarHomeLink = screen.getByText("Home")
        fireEvent.click(NavbarHomeLink)
        expect(mockedNavigation).toHaveBeenCalledWith(
            "/", 
            {
                "preventScrollReset": undefined, 
                "relative": undefined, 
                "replace": true, 
                "state": undefined, 
                "viewTransition": undefined
            }
        )
    })

    test("Upload link in navbar button links to upload page", () => {
        const NavbarUploadLink = screen.getByText("Upload")
        fireEvent.click(NavbarUploadLink)
        const lastIndex = mockedNavigation.mock.calls.length - 1
        expect(mockedNavigation.mock.calls[lastIndex][0]).toEqual("/upload")
    })
}

)