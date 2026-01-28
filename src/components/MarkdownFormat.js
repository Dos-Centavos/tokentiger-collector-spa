/**
 *  support markdown , links , line breaks
 */
import React from 'react'
import { marked } from 'marked' // https://www.npmjs.com/package/marked/v/0.3.9
import markdownStyles from './MarkdownFormat.module.scss'

const MarkdownFormat = ({ content }) => {
  const formatContent = (content) => {
    if (!content) return ''
    // create marked renderer
    const renderer = new marked.Renderer()
    // customize link renderer to open in new tab
    renderer.link = function ({ href, text }) {
      return `<a href="${href}" target="_blank" >${text}</a>`
    }
    // set marked options
    marked.setOptions({
      renderer,
      breaks: true

    })
    // parse content to html
    const html = marked.parse(content)

    return html
  }

  return (
    <div className={markdownStyles.markdownContent} style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
  )
}

export default MarkdownFormat
