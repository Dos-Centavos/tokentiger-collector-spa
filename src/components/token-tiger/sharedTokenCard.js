import React from 'react'

import sharedTStyles from './styles/sharedToken.module.scss'
import { PropagateLoader } from 'react-spinners'

export default function SharedTokenCard (props) {
  const { token } = props
  return (

    <div className={sharedTStyles.container}>
      <div className={sharedTStyles.nftWrapper}>
        {!token.iconNeedsDownload && token.icon}
        {token.iconNeedsDownload && (
          <PropagateLoader
            color='#ffffff'
            loading={token.iconNeedsDownload}
            size={5}
            cssOverride={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
            speedMultiplier={1}
          />
        )}
        {/*   <img className={sharedTStyles.nft} src={} alt='nft example' /> */}
      </div>
      <h2>{token.name}</h2>
      {/*  <h3>NFT Name</h3> */}
    </div>

  )
}
