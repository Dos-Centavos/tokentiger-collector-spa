import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { PropagateLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

import sharedTStyles from './styles/sharedToken.module.scss'

const GATEWAY = process.env.REACT_APP_IPFS_GATEWAY

export default function SharedTokenCard (props) {
  const { token } = props
  const [isPublic, setIsPublic] = useState(false)
  const navigate = useNavigate()

  // Derive whether this NFT is public or private from token data.
  useEffect(() => {
    if (!token.tokenData) return
    setIsPublic(!!token.tokenData.payloadCid)
  }, [token.tokenData])

  // Get about from mutableData
  const about = token.tokenData?.mutableData?.about || token.about || ''
  const truncatedAbout =
    about && about.length > 80 ? about.substring(0, 80) + '…' : about

  const handleSeeMore = () => {
    const tokenId = token.tokenId

    // Pass minimal token data via location state for the Token Info UI.
    navigate(`/token/${tokenId}`)
  }

  const handleDownload = () => {
    // eslint-disable-next-line no-console

    if (token?.tokenData?.payloadCid) {
      window.open(`${GATEWAY}/ipfs/download/${token.tokenData.payloadCid}`)
    }
  }

  return (
    <div
      className={`${sharedTStyles.container} ${
        isPublic ? sharedTStyles.publicNft : sharedTStyles.privateNft
      }`}
    >
      {/* Visibility tag */}
      {!token.iconNeedsDownload && (
        <div className={sharedTStyles.nftTag}>
          {isPublic ? 'Public NFT' : 'Private NFT'}
        </div>
      )}

      {/* Image / icon area */}
      <div className={sharedTStyles.nftWrapper}>
        {!token.iconNeedsDownload && (
          <div className={sharedTStyles.nftMedia}>
            {token.icon}
          </div>
        )}
        {token.iconNeedsDownload && (
          <PropagateLoader
            color='#ffffff'
            loading={token.iconNeedsDownload}
            size={5}
            cssOverride={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
            speedMultiplier={1}
          />
        )}
      </div>

      {/* Text content */}
      <div className={sharedTStyles.content}>
        <h2 className={sharedTStyles.title}>{token.name}</h2>
        <p className={sharedTStyles.about}>{truncatedAbout}</p>

        {/* Action buttons */}
        <div className={sharedTStyles.buttonGroup}>
          <Button
            variant='primary'
            size='sm'
            className={sharedTStyles.primaryButton}
            onClick={handleSeeMore}
          >
            See more
          </Button>

          <Button
            variant='outline-secondary'
            size='sm'
            className={sharedTStyles.secondaryButton}
            onClick={handleDownload}
            disabled={!isPublic}
          >
            <FontAwesomeIcon icon={faDownload} className={sharedTStyles.downloadIcon} />
            <span>Download</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
