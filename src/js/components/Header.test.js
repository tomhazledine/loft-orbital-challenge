import * as React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";

describe("Header", () => {
    it("renders Header component", () => {
        render(<Header />, { wrapper: BrowserRouter });
    });

    it("renders the title", () => {
        const { getByText } = render(<Header />, { wrapper: BrowserRouter });
        const title = getByText(/GraphHopper/i);
        expect(title).toBeInTheDocument();
    });

    it("includes a link to the homepage", () => {
        const { getByText } = render(<Header />, { wrapper: BrowserRouter });
        const link = getByText(/GraphHopper/i).closest("a");
        expect(link).toHaveAttribute("href", "/");
    });
});
