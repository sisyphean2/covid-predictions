import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import './App.css';
import { MapContainer } from './features/map-container/MapContainer';

  // https://github.com/zcreativelabs/react-simple-maps
  // Datamaps: https://github.com/markmarkoh/datamaps
  // Cartomap: https://github.com/emeeks/d3-carto-map
  // The whole geomap ecosystem appears to be buggy and unusable. Sample pages give 404. Unless my json is corrupt?
  // Geomap AND D3plus geomap: https://github.com/yaph/d3-geomap AND https://github.com/d3plus/d3plus-geomap

  // See https://github.com/topojson/us-atlas for topojson map files
  // const worldMapUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-10m.json';
  // const americanStatesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
  // const americanCountiesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
  // const covidDataUrl = 'https://corona.lmao.ninja/v2/nyt/usa';

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <MapContainer />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
