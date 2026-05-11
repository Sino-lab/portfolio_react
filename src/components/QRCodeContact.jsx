import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeContact() {
  const vcardUrl = `${window.location.origin}/contact.vcf`
  return (
    <QRCodeSVG
      value={vcardUrl}
      size={160}
      fgColor="#e8e6e1"
      bgColor="transparent"
      level="H"
      includeMargin={false}
    />
  )
}
