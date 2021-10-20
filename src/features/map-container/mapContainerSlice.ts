import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { statePopulations } from '../../constants';

// This is an object with state name keys and case total values.
export interface singleDayCases {
  [key: string]: number
}

// This is an object with dates as keys and singleDayCases as values.
export interface dailyStateCases {
  [key: string]: singleDayCases
}

export interface mapContainerState {
  casesToDisplay: singleDayCases,
  dailyStateCases: dailyStateCases,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: mapContainerState = {
  casesToDisplay: {},
  dailyStateCases: {},
  status: 'idle',
};

export const mapContainerSlice = createSlice({
  name: 'mapContainer',
  initialState,
  reducers: {
    updateDailyStateCases: (state, action: PayloadAction<{date: string, states: singleDayCases}>) => {
      state.dailyStateCases[action.payload.date] = action.payload.states;
    },
    updateCasesToDisplay: (state, action: PayloadAction<{allCases: dailyStateCases, dailyWeekly: string}>) => {
      const allCases = action.payload.allCases;
      const dailyWeekly = action.payload.dailyWeekly;
      const requestedDates = action.payload.requestedDates;
      const totalPerCapita = action.payload.totalPerCapita;

      let cases = {...allCases[requestedDates[0]]};
      if (dailyWeekly === 'Weekly') {
        requestedDates.forEach(date => {
          if (date !== requestedDates[0]) {
            Object.keys(cases).forEach(state => {
              cases[state] += allCases[date][state];
            });
          }
        });
      }
      if (totalPerCapita === 'per capita') {
        const perCapitaCases = {} as singleDayCases;
        Object.keys(cases).forEach(state => {
          const frontendStateName = state.split('_').map(string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }).join(' ');
          perCapitaCases[state] = cases[state] / statePopulations[frontendStateName];
        })
        cases = perCapitaCases;
      }
      state.casesToDisplay = cases;
    },
  },
});

export const { updateCasesToDisplay, updateDailyStateCases } = mapContainerSlice.actions;

export const getDailyStateCases = (state: RootState) => state.mapContainer.dailyStateCases;
export const getCasesToDisplay = (state: RootState) => state.mapContainer.casesToDisplay;

export default mapContainerSlice.reducer;