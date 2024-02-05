export interface PaymentMeans {
    code: string;
    code_name: string;
    payment_id: string;
    bakong_id: string;
    name: string;
  }

  export interface TaxTotal {
    tax_amount: number;
    tax_subtotals: TaxSubtotal[];
  }
  
  export interface TaxSubtotal {
    taxable_amount: string;
    tax_amount: string;
    tax_category: TaxCategory;
  }
  
  export interface TaxCategory {
    id: string;
    percent: number;
    tax_scheme: string;
  }
  
  export interface LegalMonetaryTotal {
    line_extension_amount: number;
    tax_exclusive_amount: number;
    tax_inclusive_amount: number;
    charge_total_amount: number;
    payable_amount: number;
  }


  export interface InvoiceLineItem {
    description: string;
    name: string;
    tax_categories: TaxCategory[];
  }
  
  export interface AllowanceCharge {
    charge_indicator: string;
    reason: string;
    amount: number;
    tax_categories: TaxCategory[];
  }
  
  interface PostalAddress {
    street_name: string;
    additional_street_name?: string;
    city_name: string;
    postal_zone: string;
    country_code: string;
  }
  
  interface PartyTaxScheme {
    company_id?: string;
    tax_scheme: string;
  }
  
  interface PartyLegalEntity {
    registration_name: string;
    company_id?: string;
  }
  
  interface Contact {
    name: string;
    phone: string;
    email?: string;
  }
  
  export interface Merchant {
    merchant_id: string;
    name: string;
    postal_address: PostalAddress;
    party_tax_scheme: PartyTaxScheme;
    party_legal_entity: PartyLegalEntity;
    contact?: Contact;
    business_type?: string;
    date_of_incorporation?: string;
    bank_account_number?: string;
    currency?: string;
    bank_name?: string;
    description?: string;
    bakong_id?: string,
    webhook_url?: string;
    iv_param?: string;
    secret_key?: string;
    hmac_secret_key?: string;
  }