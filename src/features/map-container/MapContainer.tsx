import React, { useState, useEffect } from 'react';

import { scaleQuantile } from 'd3-scale';
import DayjsUtils from '@date-io/dayjs';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCasesToDisplay, getDailyStateCases, updateCasesToDisplay, updateDailyStateCases } from './mapContainerSlice';

export function MapContainer() {
  const dayjs = new DayjsUtils().dayjs;
  const localStatesTopoJsonUrl:string = './states.json';

  const dispatch = useAppDispatch();
  const allCases = useAppSelector(getDailyStateCases);
  const casesToDisplay = useAppSelector(getCasesToDisplay);
  const [dailyWeekly, setDailyWeekly] = useState<string>('Daily'); //daily vs weekly
  const [selectedDate, handleDateChange] = useState(new Date(2021, 9, 6)); //Oct 6, 2021
  const [totalPerCapita, setTotalPerCapita] = useState<string>('per capita'); //total vs per capita

  const dailyWeeklyOpposite = dailyWeekly === 'Weekly' ? 'Daily' : 'Weekly';
  const totalPerCapitaOpposite = totalPerCapita === 'per capita' ? 'total' : 'per capita';
  const displayDate:string = dayjs(selectedDate).format('MMM DD, YYYY');
  const requestedDates:string = [dayjs(selectedDate).format('YYYYMMDD')];
  if (dailyWeekly === 'Weekly') {
      for (let counter = 1; counter < 4; counter++) {
        requestedDates.push(dayjs(selectedDate).add(counter, 'day').format('YYYYMMDD'));
        requestedDates.push(dayjs(selectedDate).subtract(counter, 'day').format('YYYYMMDD'));
      }
  }

  const runTimeLapse = () => {
    setDailyWeekly('Weekly');
    setTotalPerCapita('per capita');
    let timeLapseDate = new Date(2020, 0, 29); //January 29, 2020 => Oct 6, 2021
    const executeSingleWeek = () => {
      handleDateChange(dayjs(timeLapseDate).format('YYYYMMDD'));
      if (dayjs(timeLapseDate).isBefore('2021-10-5', 'day')) {
        timeLapseDate = dayjs(timeLapseDate).add(7, 'day');
        setTimeout(executeSingleWeek, 500);
      }
    }
    setTimeout(executeSingleWeek, 500);
  };

  const fetchCovidData = async (dateToFetch) => {
    if (!allCases[dateToFetch]) {
      const pythonBackendUrl = `http://localhost:8000/get_by_date/?date=${dateToFetch}`
      const response = await fetch(pythonBackendUrl);
      const results = await response.json();
      dispatch(updateDailyStateCases({date: dateToFetch, states: results[0].fields}))
    }
  };

  // TODO handle failures, especially invalid dates, especially on conversion to weekly.
  useEffect(() => {
    requestedDates.forEach(date => fetchCovidData(date));
  }, [dailyWeekly, selectedDate]);

  useEffect(() => {
    const isWeeklyAndValid = dailyWeekly === 'Weekly' && requestedDates.every(date => allCases[date]);
    const isDailyAndValid = dailyWeekly === 'Daily' && allCases[requestedDates[0]];
    if (isWeeklyAndValid || isDailyAndValid) {
      dispatch(updateCasesToDisplay({
        allCases,
        dailyWeekly,
        requestedDates,
        totalPerCapita,
      }));
    }
  }, [allCases, dailyWeekly, selectedDate, totalPerCapita]);

  const colorScale = scaleQuantile()
    .domain(Object.values(casesToDisplay))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  return (
    <>
      <h2>{dailyWeekly} covid cases ({totalPerCapita}) by state {displayDate}</h2>
      <KeyboardDatePicker
        format="MM/DD/YYYY"
        maxDate={new Date(2021, 9, 13)}
        minDate={new Date(2020, 0, 21)}
        onChange={date => handleDateChange(date)}
        shouldDisableDate={(date) => {
          if (dailyWeekly === 'Daily') {
            return false;
          } else {
            return date.day() !== 3;
          }
        }}
        value={selectedDate}
        variant='inline'
      />
      <button onClick={setDailyWeekly.bind(null, dailyWeeklyOpposite)}>{dailyWeeklyOpposite}</button>
      <button onClick={setTotalPerCapita.bind(null, totalPerCapitaOpposite)}>{totalPerCapitaOpposite}</button>
      <button onClick={runTimeLapse}>Run Time Lapse</button>
      <br></br>
      Data provided by the NYTimes, design and coding brought to you by <a href='www.briancato.com'>Brian Cato</a>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={localStatesTopoJsonUrl}>
          {({geographies}) => geographies.map(geo => {
            const stateName = geo.properties.name.toLowerCase().split(' ').join('_');
            const casesThatDay = casesToDisplay[stateName];
            return <Geography
              fill={casesThatDay ? colorScale(casesThatDay) : '#EEE'}
              geography={geo}
              key={geo.rsmKey}
            />
          })}
        </Geographies>
      </ComposableMap>
    </>
  )
}