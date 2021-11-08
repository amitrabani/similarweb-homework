import {fireEvent, render, screen} from "@testing-library/react";
import {DragAndDropList} from "./DragAndDropList";

const list = [{
    id: 1234,
    videoId: 1234,
    title: "title",
    duration: '4:23'
}, {
    id: 12345,
    videoId: 12345,
    title: "title",
    duration: '4:23'
}]

describe("List", () => {
    test("List rendered", () => {
        render(<DragAndDropList playlist={list} setPlaylistData={() => {
        }}/>)
        const listElements = screen.getAllByText('title')
        expect(listElements).toHaveLength(2);
    });
    test("input change", () => {
        render(<DragAndDropList playlist={list} setPlaylistData={() => {
        }}/>)
        const input = screen.getByTestId('input')
        fireEvent.change(input, {target: {value: 'testValue'}})
        expect(input.value).toBe('testValue');
    });
});