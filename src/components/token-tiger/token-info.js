import React, { useContext } from 'react'
import { Container, Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'

import Header from './header'
import Footer from './footer'
import MarkdownFormat from '../MarkdownFormat'

import styles from './styles/tokenInfo.module.scss'
import { GlobalContext } from '../../hooks/global-state.js'

export default function TokenInfoPage () {
  const { tokensCache } = useContext(GlobalContext)
  console.log('tokensCache', tokensCache)
  const navigate = useNavigate()
  const { tokenId } = useParams()

  const token = tokensCache[tokenId]
  if (!token) return null

  const { tokenData } = token
  console.log('tokenData', tokenData)
  const media = tokenData?.media
  const markdownContent = tokenData?.userDataMarkdown
  const marketData = tokenData.marketData
  const onSale = tokenData.onSale
  console.log('marketData', marketData)

  const handleBack = () => {
    const userId = token.userOwner
    const publicId = token.collectionOwner
    if (userId && publicId) {
      navigate(`/users/share/nft/${userId}/${publicId}`)
    } else {
      navigate(-1)
    }
  }

  const onBuy = async () => {
    const url = `${process.env.REACT_APP_FRONT_URL}/buy/${tokenId}`
    window.open(url, '_blank')
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* Back button */}
      <button
        type='button'
        className={styles.backButton}
        onClick={handleBack}
        aria-label='Go back to collection'
      >
        <span className={styles.backIcon}>←</span>
      </button>

      <main className={styles.main}>
        <Container className={styles.container}>
          <header className={styles.header}>
            <div className={styles.imageWrapper}>
              {media && media.length > 0
                ? (
                  <Carousel className={styles.carousel}>
                    {media.map((url, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className={styles.image}
                          src={url}
                          alt={`${token.name} -Media ${index + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  )
                : (
                    token.icon
                      ? (
                        <img
                          src={token.tokenIconUrl}
                          alt={token.name}
                          className={styles.image}
                        />
                        )
                      : (
                        <div className={styles.imagePlaceholder}>
                          <span>{token.name?.charAt(0) || '?'}</span>
                        </div>
                        )
                  )}
            </div>
            <h1 className={styles.title}>{token.name}</h1>
            {onSale && marketData && (
              <div className={styles.buyWrapper}>
                <div className={styles.buyButton} aria-hidden='true'>
                  <FontAwesomeIcon icon={faShoppingCart} className={styles.buyIcon} />
                  <span onClick={onBuy}>Buy NFT</span>
                </div>
              </div>
            )}
            <p className={styles.subtitle}>{token.about}</p>
          </header>
          <section className={styles.content} aria-label='Token information'>
            <MarkdownFormat content={markdownContent} />
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
