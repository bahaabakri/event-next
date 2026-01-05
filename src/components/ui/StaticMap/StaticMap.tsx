type StaticMapProps = {
  lat: number
  lng: number
  zoom?: number
}

export default function StaticMap({
  lat,
  lng,
  zoom = 14,
}: StaticMapProps) {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`

  return (
    <iframe
      src={src}
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: 12 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
