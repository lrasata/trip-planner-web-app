import {createContext, useReducer} from 'react';
import {ITrip} from "../../types.ts";


export const CreateTripContext = createContext({
    name: '',
    description: '',
    city: '',
    region: '',
    country: '',
    departureDate: '',
    returnDate: '',
    // @ts-ignore
    updateTripContext: (trip: ITrip) => {},
});

export const updateTripContextReducer = (state: any, action: { type: string; payload: ITrip; }) => {
    if (action.type === 'UPDATE_TRIP_CONTEXT') {
        return {
            ...state,
            ...action.payload
        };
    }
    return state;
}

// @ts-ignore
export default function UpdateTripContextProvider({ children }) {
    const [contextState, contextDispatch] = useReducer(
        updateTripContextReducer,
        {
            name: '',
            description: '',
            city: '',
            region: '',
            country: '',
            departureDate: '',
        }
    );

    const handleUpdateTripContext = (trip: ITrip) => {
        contextDispatch({
            type: 'UPDATE_TRIP_CONTEXT',
            payload: trip
        });
    }

    const ctxValue = {
        name: contextState.name,
        description: contextState.description,
        city: contextState.city,
        region: contextState.region,
        country: contextState.country,
        departureDate: contextState.departureDate,
        returnDate: contextState.returnDate,
        updateTripContext: handleUpdateTripContext,
    };

    return (
        <CreateTripContext.Provider value={ctxValue}>{children}</CreateTripContext.Provider>
    );
}