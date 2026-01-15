import React from 'react'

import deletedStyles from './styles/deletedSharable.module.scss'
import deletedImage from './assets/deleted.png'

export default function DeletedSharable () {
  return (
    <div className={deletedStyles.container}>
      <div className={deletedStyles.content}>
        <div className={deletedStyles.imageContainer}>
          <img
            src={deletedImage}
            alt='Deleted collection'
            className={deletedStyles.image}
          />
        </div>
        <h2 className={deletedStyles.message}>
          This Shareable Collection has been removed
        </h2>
      </div>
    </div>
  )
}
