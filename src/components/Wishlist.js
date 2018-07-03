import React from 'react';

export class Wishlist extends React.Component {

  render() {
    const {wishlist, removeFromWishlist, moveToVisited} = this.props;
    return <div className='wishlist-background'>
    <div className='wishlist'>
      {wishlist.length===1 ? <div className='wishlist-summary'>You have {wishlist.length} country on your wishlist. Good luck!</div> : <div className='wishlist-summary'>You have {wishlist.length} countries on your wishlist. Good luck!</div>}
      <div className='wishlist-content'>
        <div>
          <div><strong><u>Europe:</u></strong></div>
            {wishlist.map((country) => country.region==='Europe' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={() => moveToVisited(country)}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
        <div>
          <div><strong><u>Asia:</u></strong></div>
            {wishlist.map((country) => country.region==='Asia' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={() => moveToVisited(country)}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
        <div>
          <div><strong><u>Africa:</u></strong></div>
            {wishlist.map((country) => country.region==='Africa' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={() => moveToVisited(country)}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
        <div>
          <div><strong><u>Oceania:</u></strong></div>
            {wishlist.map((country) => country.region==='Oceania' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={() => moveToVisited(country)}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
        <div>
          <div><strong><u>Americas:</u></strong></div>
            {wishlist.map((country) => country.region==='Americas' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={() => moveToVisited(country)}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
        <div>
          <div><strong><u>Polar:</u></strong></div>
            {wishlist.map((country) => country.region==='Polar' &&
            <p key={country.alpha3Code}>{country.name}
              <span className='wishlist-remove' onClick={() => removeFromWishlist(country)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span className='wishlist-mark' onClick={moveToVisited}>
                <i className="fas fa-check"></i>
              </span>
            </p>)}
        </div>
      </div>

    </div>
  </div>
  }
}

export default Wishlist;
