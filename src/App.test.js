import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import axios from "axios";
import testData from './TestData'
jest.mock('axios')

test('renders all elements correctly', async () => {
    const mockGetRequest = jest.fn(() => Promise.resolve({data: testData}));
    axios.get.mockImplementationOnce(mockGetRequest)
    render(<App/>);

    expect(screen.getByText("Input New To-Do Item")).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(mockGetRequest).toHaveBeenCalledWith("http://localhost:3001/api/items")
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(testData.length))
});