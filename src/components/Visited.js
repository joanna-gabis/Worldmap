import React from 'react';

export class Visited extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromVisited = this.removeFromVisited.bind(this);
  }

  removeFromVisited(country) {
    // fetch('http://localhost:3000/visited', {
    //   method: 'DELETE',
    //   body: JSON.stringify( {event.target} )
    //   })
    //   .then( resp => resp.json())
    //   .then( data => {
    //   console.log( data );
    // });
    console.log(country);
  }

  render() {
    const {visitedCountries, removeFromVisited} = this.props;
    return <div className='visited-countries-background'>
      <div className='visited-countries'>
        <div className='visited-summary'>You have visited {visitedCountries.length} out of 250 countries and other territories ({((visitedCountries.length/250)*100).toFixed(1)}%). That means {250-visitedCountries.length} countries to go!</div>
        <div className='visited-content'>
          <div>
            <div><strong><u>Europe:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Europe' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
          <div>
            <div><strong><u>Asia:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Asia' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
          <div>
            <div><strong><u>Africa:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Africa' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
          <div>
            <div><strong><u>Oceania:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Oceania' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
          <div>
            <div><strong><u>Americas:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Americas' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
          <div>
            <div><strong><u>Polar:</u></strong></div>
              {visitedCountries.map((country) => country.region==='Polar' && <p key={country.alpha3Code}>{country.name}<span className='visited-countries-remove' onClick={() => removeFromVisited(country)}><i className="fa fa-times" aria-hidden="true"></i></span></p>)}
          </div>
        </div>
      </div>
    </div>
  }
}

export default Visited;
