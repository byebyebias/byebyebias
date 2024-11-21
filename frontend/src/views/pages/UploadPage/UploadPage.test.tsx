import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from "@testing-library/user-event";

import { MemoryRouter, Routes, Route } from "react-router-dom";
import UploadPage from '../views/pages/UploadPage/UploadPage';

describe('Testing Upload Page', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/upload']}>
              <Routes>
                <Route path="/upload" element={<UploadPage />} />
              </Routes>
            </MemoryRouter>
          );
    })

    test("Page renders with Upload section first", () => {
        const upload_header = screen.getByText("Upload Your Dataset");
        expect(upload_header).toBeInTheDocument();
    })

    test("File uploads successfully", async () => {
        const test_file = new File([], "test_file.parquet");
        const upload_button = screen.getByLabelText("Choose a file to upload");
        const user = userEvent.setup();

        await user.click(upload_button);
        const upload_input = screen.getByLabelText("File upload") as HTMLInputElement;
        console.log(upload_input.files)

        Object.defineProperty(upload_input, 'files', {
            value: [test_file],
            writable: false,
          });

        fireEvent.change(upload_input);


        // userEvent.upload(upload_input, test_file);
        expect(upload_input.files?.length).toBe(1);
        expect(screen.getByText("test_file.parquet")).toBeInTheDocument();
          
    })
})
