import uiSlice, { uiActions } from "./ui-slice";

const uiReducer = uiSlice.reducer;
const initialState = uiReducer(undefined, { type: "" });

describe("ui slice", () => {
	it("should return the initial state", () => {
        expect(initialState).toEqual({ isShown: false })
	});
    it("should save notification data", () => {
        const notification = {
            status: "test status",
            title: "test title",
            message: "test message"
        }

        const action = uiActions.showNotification(notification);
        const result = uiReducer(initialState, action);
        
        expect(result.isShown).toEqual(true);
        expect(result.notification).toEqual(notification);
    });
    it("should hide notification", () => {
        const action = uiActions.hideNotification();
        const result = uiReducer(initialState, action);
        
        expect(result.isShown).toEqual(false);
    });
});
