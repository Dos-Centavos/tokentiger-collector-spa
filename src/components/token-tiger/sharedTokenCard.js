import React, { useState, useEffect } from 'react'

import sharedTStyles from './styles/sharedToken.module.scss'
import { PropagateLoader } from 'react-spinners'

export default function SharedTokenCard (props) {
  const { token } = props
  const [isPublic, setIsPublic] = useState(false)

  // Get NFT tag.
  useEffect(() => {
    if (!token.tokenData) {
      return
    }
    setIsPublic(token.tokenData.payloadCid)
  }, [token.tokenData])

  return (
    <div className={`${sharedTStyles.container} ${isPublic ? sharedTStyles.publicNft : sharedTStyles.privateNft}`}>
      {/** show tag when the icons is success downloaded */}
      {!token.iconNeedsDownload && (
        <div className={sharedTStyles.nftTag}>
          {isPublic ? 'Public NFT' : 'Private NFT'}
        </div>
      )}
      <div className={sharedTStyles.nftWrapper}>
        {!token.iconNeedsDownload && (
          <div>
            {token.icon}
          </div>
        )}
        {token.iconNeedsDownload && (
          <PropagateLoader
            color='#ffffff'
            loading={token.iconNeedsDownload}
            size={5}
            cssOverride={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
            speedMultiplier={1}
          />
        )}
      </div>
      <h2>{token.name}</h2>
    </div>
  )
}
