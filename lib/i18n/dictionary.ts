export type Language = 'es' | 'en'

export const LANGUAGE_COOKIE = 'ow-lang'

export const dictionary = {
  es: {
    soldOutToday: 'Agotado hoy',
    chefRecommended: 'Recomendado del chef',
    new: 'Nuevo',
    spicy: 'Picante',
    vegetarian: 'Vegetariano',
    glutenFree: 'Sin gluten',
    viewLocations: 'Nuestras sedes',
    backHome: 'Volver al inicio',
    locationUnavailableTitle: 'Sede temporalmente cerrada',
    locationUnavailableBody:
      'Esta sede no está disponible en este momento. Vuelve pronto.',
    notFoundTitle: 'No encontramos esta sede',
    notFoundBody: 'Verifica el código QR o vuelve al inicio.',
    emptyCategory: 'Pronto agregaremos platos a esta categoría.',
    address: 'Dirección',
    phone: 'Teléfono',
    priceOnRequest: 'Consultar',
    close: 'Cerrar',
  },
  en: {
    soldOutToday: 'Sold out today',
    chefRecommended: "Chef's recommendation",
    new: 'New',
    spicy: 'Spicy',
    vegetarian: 'Vegetarian',
    glutenFree: 'Gluten-free',
    viewLocations: 'Our locations',
    backHome: 'Back home',
    locationUnavailableTitle: 'Temporarily closed',
    locationUnavailableBody:
      'This location isn’t available right now. Check back soon.',
    notFoundTitle: "We couldn't find this location",
    notFoundBody: 'Check the QR code or head back home.',
    emptyCategory: 'Dishes for this category are coming soon.',
    address: 'Address',
    phone: 'Phone',
    priceOnRequest: 'Ask your server',
    close: 'Close',
  },
} as const satisfies Record<Language, Record<string, string>>
