/*
  This is an SPA that creates a template for future BCH web3 apps.
*/

// Global npm libraries
import React from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'
// import WaitingModal from './components/waiting-modal'
import AsyncLoad from './services/async-load'
// import SelectServerButton from './components/servers/select-server-button'
import Footer from './components/token-tiger/footer'
import Header from './components/token-tiger/header'
import AppBody from './components/app-body'
import { getSharableCollectionData } from './services/token-tiger/users'

import LoginForm from './pages/login'
import PropagateLoader from 'react-spinners/PropagateLoader'

import {
  useParams
} from 'react-router-dom'
// Default restURL for a back-end server.
let serverUrl = process.env.REACT_APP_BCH_REST_URL || 'https://free-bch.fullstack.cash'

let userIdParam = ''
let publicIdParam = ''

// Default alternative servers.
const defaultServerOptions = [
  { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
  { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
  { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
  { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
]

let _this

class Shared extends React.Component {
  constructor (props) {
    super(props)

    // Encasulate dependencies
    this.asyncLoad = new AsyncLoad()

    this.state = {
      wallet: false, // BCH wallet instance
      menuState: 0, // The current View being displayed in the app
      serverUrl, // Stores the URL for the currently selected server.
      servers: defaultServerOptions, // A list of back end servers.

      // Startup Modal
      showStartModal: true, // Should the startup modal be visible?
      asyncInitFinished: false, // Did startup finish?
      asyncInitSucceeded: null, // Did startup finish successfully?
      modalBody: [], // Strings displayed in the modal
      hideSpinner: false, // Spinner gif in modal,
      targetBchAddr: null,
      errMsg: null
    }

    this.cnt = 0

    _this = this
  }

  async componentDidMount () {
    await _this.startAsyncFunctions()
  }

  async startAsyncFunctions () {
    try {
      if (!userIdParam || !publicIdParam) {
        throw new Error('Wrong Link!!')
      }
      // _this.addToModal('Loading minimal-slp-wallet')

      await _this.asyncLoad.loadWalletLib()

      // _this.addToModal('Getting alternative servers')
      const servers = await _this.asyncLoad.getServers()
      // console.log('servers: ', servers)

      // _this.addToModal('Initializing wallet')
      // console.log(`Initializing wallet with back end server ${serverUrl}`)

      const wallet = await _this.asyncLoad.initWallet(serverUrl)

      // _this.addToModal('Fetching NFT Collection')

      await _this.fetchAddr(userIdParam, publicIdParam)

      _this.setState({
        wallet,
        serverUrl,
        servers,
        asyncInitFinished: true,
        asyncInitSucceeded: true
      })
    } catch (err) {
      console.warn(err)

      _this.setState({
        hideSpinner: true,
        asyncInitFinished: true,
        asyncInitSucceeded: false,
        errMsg: `${err.message}`
      })
    }
  }

  render () {
    // console.log('App component rendered. this.state.wallet: ', this.state.wallet)
    // console.log(`App component menuState: ${this.state.menuState}`)
    // console.log(`render() this.state.serverUrl: ${this.state.serverUrl}`)

    // This is a macro object that is passed to all child components. It gathers
    // all the data and handlers used throughout the app.
    const appData = {
      servers: this.state.servers, // Alternative back end servers
      wallet: this.state.wallet
    }

    return (
      <>
        {(!userIdParam || !publicIdParam) && <GetParams />}
        <GetRestUrl />
        <LoadScripts />

        <>
          <Header />

          {!this.state.asyncInitSucceeded && !this.state.errMsg && (
            <PropagateLoader
              color='#ffffff'
              loading={!this.state.asyncInitSucceeded}
              size={5}
              cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              speedMultiplier={1}
            />
          )}
          {this.state.asyncInitSucceeded && !this.state.errMsg && (
            <InitializedView wallet={this.state.wallet} menuState={this.state.menuState} appData={appData} targetBchAddr={this.state.targetBchAddr} />
          )}

          {this.state.errMsg && <div style={{ textAlign: 'center' }}><h3>{this.state.errMsg}</h3></div>}

        </>

        {this.state.isAuth === false && <LoginForm callback={_this.startAsyncFunctions} />}
        <Footer />
      </>
    )
  }

  // Add a new line to the waiting modal.
  addToModal (inStr) {
    const modalBody = this.state.modalBody

    modalBody.push(inStr)

    this.setState({
      modalBody
    })
  }

  // This handler is passed into the child menu component. When an item in the
  // nav menu is clicked, this handler will update the state. The state is
  // used by the AppBody component to determine which View component to display.
  onMenuClick (menuState) {
    // console.log('menuState: ', menuState)

    _this.setState({
      menuState
    })
  }

  // Get bch address by user and public ID
  async fetchAddr (userId, publicId) {
    try {
      const result = await getSharableCollectionData({ userId, publicId })
      _this.setState({ targetBchAddr: result.bchAddress })
    } catch (err) {
      if (err.message) {
        throw err
      }
      throw new Error('Address not found!')
    }
  }
}

/// / This is rendered *before* the BCH wallet is initialized.
// function UninitializedView(props) {
//  // console.log('UninitializedView props: ', props)
//
//  const heading = 'Loading Blockchain Data...'
//
//  return (
//    <>
//      <WaitingModal
//        heading={heading}
//        body={props.modalBody}
//        hideSpinner={props.hideSpinner}
//        denyClose={props.denyClose}
//      />
//
//      {
//        _this.state.asyncInitFinished
//          ? <AppBody menuState={100} wallet={props.wallet} appData={props.appData} />
//          : null
//      }
//    </>
//  )
// }

// This is rendered *after* the BCH wallet is initialized.
function InitializedView (props) {
  return (
    <>
      <br />
      <AppBody menuState={_this.state.menuState} wallet={props.wallet} appData={props.appData} targetBchAddr={props.targetBchAddr} />
    </>
  )
}

// Get the restURL query parameter.
function GetRestUrl (props) {
  const [restURL] = useQueryParam('restURL', StringParam)
  // console.log('restURL: ', restURL)

  if (restURL) {
    serverUrl = restURL
    // queryParamExists = true
  }

  return (<></>)
}
// Get the userId and publicId parameters.
// example : /users/share/nft/63e43cbbf7ac232816b6cf25/41846499994000031506204303818752
function GetParams () {
  const params = useParams()
  userIdParam = params.userId
  publicIdParam = params.publicId

  return (<></>)
}

export default Shared
