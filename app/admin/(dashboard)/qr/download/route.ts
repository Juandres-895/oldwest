import { NextResponse, type NextRequest } from 'next/server'
import QRCode from 'qrcode'
import { requireUser } from '@/lib/supabase/requireUser'
import { getLocationById } from '@/lib/data/admin'

const QR_COLORS = { dark: '#1c120d', light: '#f3ecdd' }

export async function GET(request: NextRequest) {
  await requireUser()

  const { searchParams } = request.nextUrl
  const locationId = searchParams.get('locationId')
  const format = searchParams.get('format') === 'png' ? 'png' : 'svg'

  if (!locationId) {
    return NextResponse.json({ error: 'locationId requerido' }, { status: 400 })
  }

  const location = await getLocationById(locationId)
  if (!location) {
    return NextResponse.json({ error: 'Sede no encontrada' }, { status: 404 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const targetUrl = `${siteUrl}/${location.slug}`

  if (format === 'png') {
    const buffer = await QRCode.toBuffer(targetUrl, {
      type: 'png',
      errorCorrectionLevel: 'H',
      width: 2000,
      margin: 2,
      color: QR_COLORS,
    })

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="qr-${location.slug}.png"`,
      },
    })
  }

  const svg = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: QR_COLORS,
  })

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `attachment; filename="qr-${location.slug}.svg"`,
    },
  })
}
