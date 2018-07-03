import React from 'react';
import { Modal } from 'semantic-ui-react';

import Map from './Map';
import CountriesList from './CountriesList';
import CountryModal from './CountryModal';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      clickedCountry: null,
    };
    this.openCountryModal = this.openCountryModal.bind(this);
    this.closeCountryModal = this.closeCountryModal.bind(this);
  }

  openCountryModal(countryId) {
    const {countries} = this.props;
      this.setState({
        isModalOpen: true,
        clickedCountry: countries.find(country => country.alpha3Code === countryId),
      })
  }
  closeCountryModal() {
    this.setState({
      isModalOpen: false,
    })
  }
  render() {
    const {countries, wishlist, visitedCountries, addToVisited, removeFromVisited, addToWishlist, removeFromWishlist} = this.props;
    const {isModalOpen, clickedCountry} = this.state;
    return <div id='main' className="container-fluid">
      <Map
        onCountryClick={this.openCountryModal}
      />
      <CountriesList
        countriesList={countries}
        onCountryClick={this.openCountryModal}
        isModalOpen={isModalOpen}
      />
      <Modal
        open={isModalOpen}
        onClose={this.closeCountryModal}
      >
      <CountryModal
        country={clickedCountry}
        countriesList={countries}
        wishlist={wishlist}
        visitedCountries={visitedCountries}
        addToVisited={addToVisited}
        removeFromVisited={removeFromVisited}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
      />
      </Modal>
    </div>
  }
}

export default Main;
