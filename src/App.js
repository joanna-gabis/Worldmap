import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

// IMPORT COMPONENTS
import Nav from './components/Nav';
import Header from './components/Header';
import Main from './components/Main';
import Visited from './components/Visited';
import Wishlist from './components/Wishlist';
import Quiz from './components/Quiz';
import NotFound from './components/NotFound';

const url = 'https://restcountries.eu/rest/v2/all';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      visited: [],
      wishlist: [],
      loading: true,
      isModalOpen: false,
      clickedCountry: {},
    };
    this.getCountriesData = this.getCountriesData.bind(this);
    this.getVisitedCountries = this.getVisitedCountries.bind(this);
    this.getWishlist = this.getWishlist.bind(this);

    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);

    this.addToVisited = this.addToVisited.bind(this);
    this.removeFromVisited = this.removeFromVisited.bind(this);
    this.moveToVisited = this.moveToVisited.bind(this);
  }

  componentDidMount() {
    Promise.all([this.getCountriesData(), this.getVisitedCountries(), this.getWishlist()])
      .then(([countries, visited, wishlist]) => {
        this.setState({
          loading: false,
          countries,
          visited,
          wishlist,
        });
      })
      .catch(() => {
        console.log('error');
      });
  }

  // GETTING DATA

  getCountriesData() {
    return fetch(url)
      .then(res => res.json());
  }
  getVisitedCountries() {
    return fetch('http://localhost:3004/visited')
      .then(res => res.json());
  }
  getWishlist() {
    return fetch('http://localhost:3004/wishlist')
      .then(res => res.json());
  }

  // WISHLIST FUNCTIONS

  addToWishlist(country) {
    fetch('http://localhost:3004/wishlist', {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify({region: country.region, name: country.name, alpha3Code: country.alpha3Code}),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        wishlist: [...this.state.wishlist, data],
      });
    });
  }
  removeFromWishlist(country) {
    const {wishlist} = this.state;
    const id = wishlist.find(item => item.alpha3Code === country.alpha3Code).id;
    fetch(`http://localhost:3004/wishlist/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.setState({
        wishlist: wishlist.filter(item => item.alpha3Code !== country.alpha3Code),
      });
    })
  }

  // VISITED FUNCTIONS

  addToVisited(country) {
    fetch('http://localhost:3004/visited', {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify({region: country.region, name: country.name, alpha3Code: country.alpha3Code}),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        visited: [...this.state.visited, data]
      });
    });
  }
  removeFromVisited(country) {
    const {visited} = this.state;
    const id = visited.find(item => item.alpha3Code === country.alpha3Code).id;
    fetch(`http://localhost:3004/visited/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.setState({
        visited: visited.filter(item => item.alpha3Code !== country.alpha3Code),
      });
    });
  }
  moveToVisited(country) {
    const {visited} = this.state;
    if (!visited.map(item => item.alpha3Code).includes(country.alpha3Code)) {
      this.addToVisited(country);
    }
    this.removeFromWishlist(country);
  }

  render() {
    return (
        <div className='app'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Header}/>
            <Route path='/countrysearch' render={(props)=> (
              <Main
                countries={this.state.countries}
                wishlist={this.state.wishlist}
                visitedCountries={this.state.visited}
                addToVisited={this.addToVisited}
                removeFromVisited={this.removeFromVisited}
                addToWishlist={this.addToWishlist}
                removeFromWishlist={this.removeFromWishlist}
              />
            )}/>
            <Route path='/visited' render={(props) => (
              <Visited
                visitedCountries={this.state.visited}
                removeFromVisited={this.removeFromVisited}
              />)}/>
            <Route path='/wishlist' render={(props) => (
              <Wishlist
                wishlist={this.state.wishlist}
                removeFromWishlist={this.removeFromWishlist}
                moveToVisited={this.moveToVisited}
              />)}/>
            <Route path='/quiz' render={(props) => (
              <Quiz countries={this.state.countries}/>
            )}/>
            <Route component={NotFound}/>
          </Switch>
          <footer className='footer'>Created by: Joanna Gabis 2018</footer>
        </div>
    );
  }
}

export default App;
