export interface IOffer {
  // offer name
  name: string;

  // unique identifier for offer
  slug: string;

  // offer description
  description: string;

  // offer requirements
  requirements: string;

  // offer thumbnail image url
  thumbnail: string;

  // indicates if offer is available for desktop
  isDesktop: number;

  // indicates if offer is available for android
  isAndroid: number;

  // indicates if offer is available for ios
  isIos: number;

  // offer url template
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  providerName: string;

  // offer id from external provider
  externalOfferId: string;
}
