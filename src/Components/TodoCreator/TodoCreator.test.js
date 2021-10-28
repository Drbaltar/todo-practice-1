import {render, screen} from "@testing-library/react";
import TodoCreator from "./TodoCreator";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import testData from '../../TestData'

jest.mock('axios');

describe('Todo Creator', function () {
    const mockUpdateList = jest.fn();

    beforeEach(() => {
        render(<TodoCreator onUpdateItemList={mockUpdateList}/>)
    })

    it('should render elements correctly', () => {
        expect(screen.getByLabelText('Input New To-Do Item')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Add Item'})).toBeInTheDocument()
    });

    describe('Adding New Item', () => {
        const testInput = "Feed the dog";
        const mockGetReturn = {data: testData}

        it('should allow user to input item in input field', () => {
            const inputField = screen.getByLabelText('Input New To-Do Item')
            userEvent.type(inputField, testInput)

            expect(inputField).toHaveValue(testInput)
        });

        describe('when hitting submit', () => {
            beforeEach(() => {
                axios.post.mockImplementation(() => Promise.resolve())
                axios.get.mockImplementation(() => Promise.resolve(mockGetReturn))
                userEvent.type(screen.getByLabelText('Input New To-Do Item'), testInput)
                userEvent.click(screen.getByRole('button', {name: 'Add Item'}))
            })

            it('should call correct axios endpoint when submit is clicked', () => {
                const spy = jest.spyOn(axios, "post");
                expect(spy).toHaveBeenCalledWith("http://localhost:3001/api/items", {content: testInput})
            });

            it('should call axios endpoint to get updated list on successful submit', () => {
                const spy = jest.spyOn(axios, "get")
                expect(spy).toHaveBeenCalledWith("http://localhost:3001/api/items")
            });

            it('should call the prop function to update App state when GET request is successful', () => {
                expect(mockUpdateList).toHaveBeenCalledWith(mockGetReturn.data);
            });

            it('should reset the input field', () => {
                expect(screen.getByLabelText('Input New To-Do Item')).toHaveValue('')
            });
        });

    });

    afterEach(() => {
        mockUpdateList.mockClear();
    })
});