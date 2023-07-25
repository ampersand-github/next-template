/**
 * @public
 */
export interface ISaveAddressRequest {
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  block?: string;
}
