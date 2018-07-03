import React from 'react';

class Tbody extends React.Component {
  render() {
    const {countriesList, onCountryClick} = this.props;
    return (
      <tbody>
        {countriesList.map(country => {
            return <tr key={country.alpha2Code} onClick={() => onCountryClick(country.alpha3Code)}>
              <td>{country.name}</td>
              <td>{country.region}</td>
            </tr>
          })
        }
      </tbody>
    )
  }
}

export class CountriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     countriesList: props.countriesList || [],
     selectedRegion: '',
     selectedName: '',
   };
    this.filterCountryListByName = this.filterCountryListByName.bind(this);
    this.filterCountryListByRegion = this.filterCountryListByRegion.bind(this);
    this.filterCountryList = this.filterCountryList.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.countriesList && this.props.countriesList.length === 0) {
      this.setState({
        selectedRegion: '',
        selectedName: '',
        countriesList: nextProps.countriesList,
      });
    }
  }

  filterCountryListByName(e) {
    const selectedName = e.target.value;
    let filteredCountriesList = this.filterCountryList(
      this.props.countriesList,
      this.state.selectedRegion,
      selectedName);
    this.setState({
      selectedName: selectedName,
      countriesList: filteredCountriesList
    });
  }

  filterCountryListByRegion(e) {
    const selectedRegion = e.target.value;
    let filteredCountriesList = this.filterCountryList(
      this.props.countriesList,
      selectedRegion,
      this.state.selectedName);
    this.setState({
      selectedRegion: selectedRegion,
      countriesList: filteredCountriesList
    });
  }

  filterCountryList(countriesList, region, name) {
    return countriesList.filter((c) => {
      return c.region.includes(region) &&
        c.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  render() {
    const {onCountryClick} = this.props;
    return (<div>
      <div className='searchbar'>
          <input type='text' name='searchInput' placeholder="Search by country's name" onChange={this.filterCountryListByName}/>
          <button className='button'><i className="fas fa-search"></i></button>
          <select className='select' onChange={this.filterCountryListByRegion}>
            <option value=''>All regions</option>
            <option value='Europe'>Europe</option>
            <option value='Asia'>Asia</option>
            <option value='Africa'>Africa</option>
            <option value='Oceania'>Oceania</option>
            <option value='Americas'>Americas</option>
            <option value='Polar'>Polar</option>
          </select>
        </div>
      <div className='countries-table'>
        <table style={{width: '100%'}} border="0" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td className='countries-table-header'>Country</td>
              <td className='countries-table-header'>Region</td>
            </tr>
          </thead>
          <Tbody
            countriesList={this.state.countriesList}
            onCountryClick={onCountryClick}
          />
        </table>
      </div>
    </div>
    )
  }
}

export default CountriesList;
