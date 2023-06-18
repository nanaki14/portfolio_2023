import { createElement } from 'react'

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const nl2br = (text: string) => {
  const regex = /(\n)/g
  return text
    .split(regex)
    .map((line, index) =>
      line.match(regex) ? createElement('br', { key: index }) : line
    )
}

export const splitText = (text: string, className?: string) => {
  return [...text].map((value, index) =>
    createElement(
      'span',
      { key: `${text}-${value}-${index}`, className },
      value
    )
  )
}

export const loadImage = (params: { src: string }) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = params.src
  })
}

export const asyncFileReader = (reader: any) => {
  const _readAs = (reader: any) => {
    return new Promise((resolve) => {
      reader.addEventListener('load', ({ target }) => resolve(target?.result))
      reader.addEventListener('error', ({ target }) => resolve(target?.error))
    })
  }

  return _readAs(reader) as any
}
