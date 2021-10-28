import {getByRole, render, screen, waitFor} from "@testing-library/react";
import Item from "./Item";
import axios from "axios";
import userEvent from "@testing-library/user-event";
jest.mock('axios')

const testItem = {
    id: 1,
    content: "Feed the horse",
    completed: false
}
const completedTestItem = {
    id: 1,
    content: "Feed the horse",
    completed: true
}

describe('Item', function () {
    const mockUpdateList = jest.fn();

    function verifyItemView() {
        expect(screen.getByRole('listitem')).toHaveTextContent("Feed the horse")
        expect(screen.getByRole('checkbox')).not.toBeChecked()
        expect(screen.getByRole('button', {name: "Delete"})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: "Edit"})).toBeInTheDocument()
        expect(screen.getByRole('listitem')).not.toContainHTML('<del>Feed the horse</del>')
    }

    it('should render all elements correctly when item is not completed', () => {
        render(<Item item={testItem} onUpdateItemList={mockUpdateList}/>)
        verifyItemView();
    });

    it('should render the item text in del tags when item is completed', () => {
        render(<Item item={completedTestItem} updateItemList={mockUpdateList}/>)
        expect(screen.getByRole('listitem')).toContainHTML('<del>Feed the horse</del>')
        expect(screen.getByRole('checkbox')).toBeChecked()
    });

    describe('Interacting with elements', () => {
        beforeEach(() => {
            render(<Item item={testItem} onUpdateItemList={mockUpdateList}/>)
        })

        it('should call patch to server when checkbox clicked', async () => {
            const mockPatchRequest = jest.fn(() => Promise.resolve())
            const mockGetRequest = jest.fn(() => Promise.resolve({data: completedTestItem}))
            axios.patch.mockImplementationOnce(mockPatchRequest)
            axios.get.mockImplementationOnce(mockGetRequest)

            userEvent.click(screen.getByRole('checkbox'))

            expect(mockPatchRequest).toHaveBeenCalledWith("http://localhost:3001/api/items/1", {completed: true})
            await waitFor(() => expect(mockGetRequest).toHaveBeenCalledWith("http://localhost:3001/api/items"))
            await waitFor(() => expect(mockUpdateList).toHaveBeenCalledWith(completedTestItem))
        });

        it('should call delete to server when delete button clicked', async () => {
            const mockDeleteRequest = jest.fn(() => Promise.resolve())
            const mockGetRequest = jest.fn(() => Promise.resolve({data: []}))
            axios.delete.mockImplementationOnce(mockDeleteRequest)
            axios.get.mockImplementationOnce(mockGetRequest)

            userEvent.click(screen.getByRole('button', {name: "Delete"}))

            expect(mockDeleteRequest).toHaveBeenCalledWith("http://localhost:3001/api/items/1")
            await waitFor(() => expect(mockGetRequest).toHaveBeenCalledWith("http://localhost:3001/api/items"))
            await waitFor(() => expect(mockUpdateList).toHaveBeenCalledWith([]))
        });

        describe('When clicking edit', () => {
            beforeEach(async () => {
                userEvent.click(screen.getByRole('button', {name: "Edit"}))
            })

            it('should render the edit view', () => {
                expect(screen.getByRole('listitem')).not.toHaveTextContent("Feed the horse")
                expect(screen.getByRole('textbox')).toHaveValue("Feed the horse")
                expect(screen.getByRole('button', {name: "Save"})).toBeInTheDocument()
                expect(screen.getByRole('button', {name: "Delete"})).toBeInTheDocument()
                expect(screen.queryByRole('button', {name: "Edit"})).toBeNull()
            });

            it('should reset to item view when save button is clicked', async () => {
                axios.patch.mockImplementationOnce(() => Promise.resolve())
                axios.get.mockImplementationOnce(() => Promise.resolve({data: []}))
                userEvent.click(screen.getByRole('button', {name: "Save"}))

                await screen.findByRole("button", {name: "Edit"})
                verifyItemView()
            })
        })
    })

    afterEach(() => {
        mockUpdateList.mockClear()
    })
});