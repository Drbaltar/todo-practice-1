import {render, screen, waitFor} from "@testing-library/react";
import UpdateItem from "./UpdateItem";
import userEvent from "@testing-library/user-event";
import {patch, get} from "axios";
jest.mock('axios')

const testItem = {
    id: 1,
    content: "Feed the horse",
    completed: false
}

describe('UpdateItem', function () {
    const mockUpdateList = jest.fn();

    beforeEach(() => {
        render(<UpdateItem item={testItem} onUpdateItemList={mockUpdateList}/>)
    });

    it('renders all elements correctly', () => {
        expect(screen.getByRole('textbox')).toHaveValue(testItem.content)
        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
    });

    it("should allow user to change the item and submit", async () => {
        const mockPatchRequest = jest.fn(() => Promise.resolve())
        const mockGetRequest = jest.fn(() => Promise.resolve({data: testItem}))
        patch.mockImplementationOnce(mockPatchRequest)
        get.mockImplementationOnce(mockGetRequest)
        userEvent.type(screen.getByRole('textbox'), " and give it water")
        expect(screen.getByRole('textbox')).toHaveValue(testItem.content + " and give it water")

        userEvent.click(screen.getByRole("button", {name: "Save"}))
        expect(mockPatchRequest).toHaveBeenCalledWith("http://localhost:3001/api/items/1", {content: testItem.content + " and give it water"})
        await waitFor(() => expect(mockGetRequest).toHaveBeenCalledWith("http://localhost:3001/api/items"))
        await waitFor(() => expect(mockUpdateList).toHaveBeenCalledWith(testItem))
    });

    afterEach(() => {
        mockUpdateList.mockClear()
    })
});