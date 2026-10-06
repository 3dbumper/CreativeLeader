import sharp from 'sharp'
import path from 'node:path'

const IMG = path.resolve('public/images')
const W = 1600
const H = 1000
const P = 24
const G = 24

async function cell(file, w, h, position = 'centre') {
  return sharp(path.join(IMG, file))
    .resize(Math.round(w), Math.round(h), { fit: 'cover', position })
    .toBuffer()
}

const topH = 520
const botTop = P + topH + G
const botH = H - botTop - P
const cellW = (W - 2 * P - 2 * G) / 3

const griffin = await cell('weapon-griffin.jpg', W - 2 * P, topH, 'centre')
const dragon = await cell('weapon-dragon.jpg', cellW, botH, 'top')
const pharaoh = await cell('weapon-pharaoh.jpg', cellW, botH, 'top')
const angel = await cell('weapon-angel.jpg', cellW, botH, 'centre')

await sharp({
  create: { width: W, height: H, channels: 3, background: { r: 18, g: 18, b: 20 } },
})
  .composite([
    { input: griffin, left: P, top: P },
    { input: dragon, left: Math.round(P), top: botTop },
    { input: pharaoh, left: Math.round(P + cellW + G), top: botTop },
    { input: angel, left: Math.round(P + 2 * (cellW + G)), top: botTop },
  ])
  .jpeg({ quality: 90 })
  .toFile(path.join(IMG, 'weapon-hard-surface-collage.jpg'))

console.log('[v0] collage written')
