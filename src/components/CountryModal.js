import React from 'react';
import tooltip from "wsdm-tooltip";

export class CountryModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    this.tip = tooltip();
    this.tip.create();
  }
  handleMouseMove(evt) {
    this.tip.show(`
      <div class="tooltip-inner">
        ${evt.target.getAttribute('tooltip')}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY });
    this.forceUpdate();
  }
  handleMouseLeave() {
    this.tip.hide();
  }

  render() {
    const {country, countriesList, wishlist, visitedCountries, addToWishlist, removeFromWishlist, addToVisited, removeFromVisited} = this.props;

    if(country !== undefined) {
      const isAddedToVisited = visitedCountries.map(item => item.alpha3Code).includes(country.alpha3Code);
      const isAddedToWishlist = wishlist.map(item => item.alpha3Code).includes(country.alpha3Code);
      
      return <div className='modal'>
        <p className='countryName'><strong>{country.name}</strong></p>
        <div className='modal-table'>
          <div className='modal-left'>
            <p>Capital: {country.capital}</p>
            {country.area!==null ? <p>Area: {(country.area).toLocaleString()} sq km</p> : <p>Area: unknown</p>}
            <p>Population: {(country.population).toLocaleString()}</p>
            <p>Borders: {country.borders.map((countryCode) => countriesList.find(country=>country.alpha3Code===countryCode).name).join(', ')}</p>
            <p>Languages spoken: {country.languages.map((lang) => lang.name).join(', ')}</p>
            <p>Currencies: {country.currencies.map((curr) => curr.name).join(', ')}</p>
            <p>Time zones: {country.timezones.join(', ')}</p>
          </div>
          <div className='modal-right'>
            <img src={country.flag} alt='flag' className='flag'/>

            {isAddedToWishlist ?
              <span
                className='icon wishlist-added'
                onClick={() => removeFromWishlist(country)}>
                <i className="fas fa-heart" tooltip='already on your wishlist' onMouseOver={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}></i>
              </span> :
              <span
                className='icon' onClick={() => addToWishlist(country)}>
                <i className="fas fa-heart" tooltip='add to wishlist' onMouseOver={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}></i>
              </span>
            }

            {isAddedToVisited ?
              <span
                className='icon visited-added'
                onClick={() => removeFromVisited(country)}>
                <i className="fas fa-check" tooltip='already visited' onMouseOver={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}></i>
              </span> :
              <span
                className='icon'
                onClick={() => addToVisited(country)}>
                <i className="fas fa-check" tooltip='mark as visited' onMouseOver={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}></i>
              </span>
            }
          </div>
        </div>
      </div>
    } else {
      return <div className='modal'>Seems we do not have this country in our database, sorry.</div>
    }

  }
}

export default CountryModal;
