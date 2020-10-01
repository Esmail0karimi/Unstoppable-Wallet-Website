import React from 'react'
import { Link } from 'react-router-dom'
import throttle from 'lodash.throttle'
import cn from 'classnames'

import Container from '../Container'
import HeaderLogo from './HeaderLogo.svg'
import Icon from '../Icon'
import { ReactComponent as Logo } from '../Footer/HSlogo.svg'

import './Header.scss'
import Button from '../Button'

class Header extends React.Component {
  state = {}

  dropdown = false
  static defaultProps = {
    navigate: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = throttle(() => {
    if (window.scrollY > 54) {
      this.setState({
        sticky: true
      });
    } else if (window.scrollY < 100) {
      this.setState({
        sticky: false
      });
    }
  }, 100)

  onToggleMenu = () => {
    const close = this.menuClose
    const toggle = this.menuToggle
    const dropdownNav = this.dropdownNav

    if (this.dropdown) {
      dropdownNav.style.display = 'none'
      close.style.display = 'none'
      toggle.style.display = 'block'
    } else {
      dropdownNav.style.display = 'block'
      close.style.display = 'block'
      toggle.style.display = 'none'
    }

    this.dropdown = !this.dropdown
    // document.body.style.overflow = this.dropdown ? 'hidden' : 'inherit'
  }

  onClickMenu = () => {
    this.onToggleMenu()
    this.dropdownNav.style.display = 'none'

    if (!this.props.navigate) {
      window.location.href = '/'
    }
  }

  render() {
    const { sticky } = this.state
    const navigation = (
      <div className="nav">
        <a target="_blank" rel="noopener noreferrer" className="nav-item" href="https://horizontalsystems.io/">
          About Us
        </a>
        <a target="_blank" rel="noopener noreferrer" className="nav-item" href="https://github.com/horizontalsystems">
          Wallet Code
        </a>
        <a target="_blank" rel="noopener noreferrer" className="nav-item" href="https://t.me/UnstoppableWallet"
           onClick={this.onClickMenu}>Tech Support</a>
        {sticky && <Button
          className="Button-circle nav-btn-item ml-20"
          text="Google Play" icon="google-play"
          link="https://play.google.com/store/apps/details?id=io.horizontalsystems.bankwallet" yellow newTab />}
        {sticky && <Button
          className="Button-circle nav-btn-item"
          text="App Store" icon="app-store"
          link="https://itunes.apple.com/app/bank-bitcoin-wallet/id1447619907?ls=1&mt=8" yellow newTab />}
      </div>
    )

    return (
      <header className={cn('Header', { 'Header-sticky': sticky })}>
        <Container>
          <div className="navbar">
            <Link to="/">
              <img className="Header-logo" src={HeaderLogo} alt="Unstoppable Cryptocurrency Wallet" />
            </Link>

            {navigation}

            <div className="Menu-wrap" onClick={this.onToggleMenu}>
              <div className="Menu-close" ref={r => this.menuClose = r}>
                <Icon name="menu-close" />
              </div>
              <div className="Menu-toggle" ref={r => this.menuToggle = r}>
                <Icon name="menu" />
              </div>
            </div>
          </div>
        </Container>
        <div className="navbar-dropdown" ref={r => this.dropdownNav = r}>
          {navigation}
          <div className="nav-logo">
            <Logo className="Logo" />
          </div>
        </div>
      </header>
    )
  }
}

export default Header
