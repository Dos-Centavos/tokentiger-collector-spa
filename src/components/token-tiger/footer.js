import React from 'react'

import footerStyles from './styles/footer.module.scss'

export default function Footer () {
  return (
    <div className={footerStyles.container}>
      <p className={footerStyles.copyright}>
        Copyright 2023 - {new Date().getFullYear()} All rights reserved - Patent Pending
      </p>
    </div>
  )
}
