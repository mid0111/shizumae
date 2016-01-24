import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import Colors from 'material-ui/lib/styles/colors';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import Phone from 'material-ui/lib/svg-icons/communication/phone';
import NearMe from 'material-ui/lib/svg-icons/maps/near-me';
import Public from 'material-ui/lib/svg-icons/social/public';
import utils from './../../utils.js';
import ShopDetailMap from './shopDetailMap.jsx';

const styles = {
  navBar: {
    position: 'fixed',
    top: 48,
    background: Colors.grey900,
    width: '100%',
    height: 48,
    verticalAlign: 'middle',
    zIndex: 5
  },
  icon: {
    width: 48,
    height: 48,
    fill: '#fff'
  },
  contents: {
    position: 'relative',
    top: 48,
    fontSize: '0.9em'
  },
  navGMap: {
    paddingBottom: 40
  },
  photoFrame: {
    backgroundColor: Colors.grey900,
    overflow: 'hidden',
    width: '100%',
    height: 140
  },
  headerFrame: {
    backgroundColor: Colors.grey900
  },
  title: {
    display: 'inline-block',
    position: 'absolute',
    marginTop: '0.5em',
    color: '#fff'
  },
  tabs: {
    width: '100%',
    backgroundColor: Colors.grey50
  },
  menuTabItem: {
    display: 'table-cell',
    width: '1%'
  },
  menuTabItemElement: {
    textAlign: 'center',
    marginBottom: 0
  },
  detail: {
    margin: 20
  }
};

class ShopDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      innerHeight: window.innerHeight
    };

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    this.setState({innerHeight: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getContainerStyle() {
    var style = {
      overflow: 'auto',
      height: this.state.innerHeight - 48,
      zIndex: 0
    };
    if(utils.isExSmallDev(window)) {
      style.width = '100%';
      style.position = 'fixed';
      style.left = 0;
      style.top = 48;
      style.padding = 0;
    } else {
      style.float = 'left';
      style.width = '66.7%';
    }
    return style;
  }

  getContentsStyle() {
    return styles.contents;
  }

  renderNavBar() {
    var titleStyle = styles.title;
    const { shop } = this.props;
    if(utils.isExSmallDev(window)) {
      return (
        <div style={styles.navBar} onClick={this.props.onClose}>
          <KeyboardArrowLeft style={styles.icon}/>
          <h3 style={styles.title}>{shop.name}</h3>
        </div>
      );
    } else {
      titleStyle.marginLeft = 30;
      return (
        <div style={styles.navBar}>
          <h3 style={styles.title}>{shop.name}</h3>
        </div>
      );
    }
  }

  renderImage() {
    var photoFrame = styles.photoFrame;
    var photoStyle = {
      marginTop: -10,
      width: '100%'
    };
    if(!utils.isExSmallDev(window)) {
      photoFrame.height = 240;
      photoStyle.width = '500px';
      photoStyle.display = 'block';
      photoStyle.marginLeft = photoStyle.marginRight = 'auto';
    }

    const { shop } = this.props;
    var image;
    if(shop.photos) {
      image = <img style={photoStyle}
                   src={shop.photos[shop.photos.length - 1].getUrl({maxWidth: 400})} />
    } else {
      photoStyle.marginTop = 0;
      image = <img src="images/no_image.png" style={photoStyle} />;
    }
    return (
      <div style={styles.photoFrame}>
        {image}
      </div>
    );
  }

  renderWebSiteLink() {
    var menuIconStyle = {
      width: '2.4em',
      height: '2.4em',
      fill: Colors.grey700
    };

    const { shop } = this.props;
    if(shop.website) {
      return <li style={styles.menuTabItem}><a target="_blank" style={styles.menuTabItemElement} href={shop.website}><Public style={menuIconStyle} /></a></li>;
    } else {
      menuIconStyle.fill=Colors.grey300;
      return <li style={styles.menuTabItem}><a disable><Public style={menuIconStyle} /></a></li>;
    }
  }

  render() {
    const { shop } = this.props;
    var phoneNumberLink = '';
    if(shop.tel) {
      phoneNumberLink = 'tel:' + shop.tel.replace(/-/g, '');
    }
    return (
      <div style={this.getContainerStyle()}>
        {this.renderNavBar()}
        <div style={this.getContentsStyle()}>
          <div style={styles.headerFrame}>
            {this.renderImage()}
          </div>
          <ul className="nav nav-pills nav-justified" style={styles.tabs}>
            <li style={styles.menuTabItem}><a target="_blank" style={styles.menuTabItemElement} href={phoneNumberLink}><Phone style={styles.menuIcon} /></a></li>
            <li style={styles.menuTabItem}><a target="_blank" style={styles.menuTabItemElement} href={shop.mapUrl}><NearMe style={styles.menuIcon} /></a></li>
            {this.renderWebSiteLink()}
          </ul>

          <div style={styles.detail}>
            <p>{shop.type}</p>
            <p>{shop.address}</p>
            <ShopDetailMap location={shop.location} />
          </div>
        </div>
      </div>
    );
  }
}

ShopDetail.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    address: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    mapUtl: PropTypes.string,
    location: PropTypes.object,
    photos: PropTypes.array,
    website: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func
}

export default ShopDetail;
