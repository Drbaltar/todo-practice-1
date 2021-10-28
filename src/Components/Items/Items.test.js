import {render, screen} from "@testing-library/react";
import Items from "./Items";
import testData from '../../TestData'

describe('Items', function () {
    beforeEach(() => {
        render(<Items items={testData}/>)
    })

    it('should render all elements', () => {
        expect(screen.getByRole('list')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(testData.length)
    });
});