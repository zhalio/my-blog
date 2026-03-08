import { revalidatePath } from 'next/cache'
import { routing } from '@/i18n/routing'

export function revalidateSiteSettings() {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/about`)
    revalidatePath(`/${locale}/posts`)
    revalidatePath(`/${locale}/tags`)
  }

  revalidatePath('/opengraph-image')
  revalidatePath('/icon')
  revalidatePath('/sitemap.xml')
}