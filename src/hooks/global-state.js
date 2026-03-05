/**
 *
 * Global State for handle tokens data.
 */
import React, { createContext, Component } from 'react'

export const GlobalContext = createContext()

export class GlobalProvider extends Component {
  state = {
    tokensCache: {},
    walletData: null,
    serversData: null,
    targetData: null //  target address data to fetch
  }

  setTokensCache = (data) => {
    this.setState({ tokensCache: data })
  }

  setWalletCache = (wallet) => {
    this.setState({ walletData: wallet })
  }

  setServersCache = (servers) => {
    this.setState({ serversData: servers })
  }

  setTargetDataCache = (targetData) => {
    this.setState({ targetData })
  }

  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setTokensCache: this.setTokensCache,
          setServersCache: this.setServersCache,
          setWalletCache: this.setWalletCache,
          setTargetDataCache: this.setTargetDataCache
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}
