import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { getCompanies } from "./service/CompaniesService";
const dummyData = [
  {
    id: 145,
    date: 1639646683,
    name: "Google",
    images: {
      "32x32": "https://placeimg.com/32/32/arch",
      "64x64": "https://placeimg.com/64/64/arch",
      "100x100": "https://placeimg.com/100/100/arch",
    },
    employees: 500,
  },
];

jest.mock("./service/CompaniesService", () => ({
  getCompanies: () => Promise.resolve({ companies: dummyData }),
}));

const mockGetCompanies = getCompanies as jest.Mock;
test("Test App Rendering", () => {
  const { container } = render(<App />);
  expect(container).not.toBeEmptyDOMElement();
});

describe("Test App Rendering", () => {
  test("Loading... should initially appear", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Search input should be intially empty", () => {
    render(<App />);
    expect(screen.getByTestId("search-input")).toHaveValue("");
  });

  test("Search input should be able to type", () => {
    render(<App />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Google" } });
    expect(searchInput).toHaveValue("Google");
  });
});

test("Accordion Test", async () => {
  render(<App />);
  const el = await screen.findAllByTestId("accordion");
  fireEvent.click(el[0]);
  waitFor(() => {
    expect(screen.findByText("Employees")).toBeInTheDocument();
  });
});

test("Interactions", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getAllByTestId("accordion")).toHaveLength(1);
  });
});

test("Search interaction", async () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");

  fireEvent.change(searchInput, { target: { value: "Amazon" } });
  waitFor(() => {
    expect(screen.getAllByTestId("accordion")).toHaveLength(0);
  });

  expect(await screen.findByText("There is no company")).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "Google" } });
  await waitFor(() => {
    expect(screen.getAllByTestId("accordion")).toHaveLength(1);
  });
});
