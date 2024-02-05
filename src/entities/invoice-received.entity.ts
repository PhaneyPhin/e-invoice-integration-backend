import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('invoice-received')
export class InvoiceReceived {
  @PrimaryColumn({ name: 'invoice_id', length: 20 })
  invoice_id: string;

  @Column({ name: 'invoice_number', nullable: true })
  invoice_number: string;

  @Column({ name: 'currency', length: 5, nullable: true })
  currency: string;

  @Column({ name: 'issue_date', type: 'date' })
  issue_date: Date | string;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  due_date: Date;

  @Column({ name: 'buyer_reference', type: "varchar", nullable: true })
  buyer_reference: string;

  @Column({ type: 'json', name: 'payment_means', nullable: true })
  payment_means: any;

  @Column({ type: 'json', name: 'tax_total', nullable: true })
  tax_total: any;

  @Column({ type: 'json', name: 'legal_monetary_total',  nullable: true })
  legal_monetary_total: any;

  @Column({ type: 'json', name: 'allowance_charges', nullable: true })
  allowance_charges: any;

  @Column({ name: 'exchange_rate', type: 'double precision', nullable: true })
  exchange_rate: number;

  @Column({ name: 'status', type: 'varchar',  nullable: true })
  status: string;

  @Column({ name: 'payment_datetime', type: 'timestamp', nullable: true })
  payment_datetime: Date | null;

  @Column({ name: 'payment_bakong_hash', type: 'varchar', nullable: true })
  payment_bakong_hash: string | null;

  @Column({ name: 'payment_ref_number', type: 'varchar', nullable: true })
  payment_ref_number: string | null;
  
  @Column({ name: 'supplier_id', type: 'varchar', length: 50, nullable: true })
  supplier_id: string;

  @Column({ name: 'customer_id', type: 'varchar', length: 50, nullable: true })
  customer_id: string;

  @Column({ type: 'json', name: 'invoice_lines',  nullable: true })
  invoice_lines: any;

  @Column({ name: 'ubl_xml', type: 'text', nullable: true })
  ubl_xml: string;

  @Column({ name: 'pdf_file', type: 'text', nullable: true})
  pdf_file: string;

  @Column({ name: 'process_id', type: 'varchar', length: 100, nullable: true })
  process_id: string;

  @Column({ type: 'json', name: 'customer',  nullable: true })
  supplier: any;

  @Column({ type: 'json', name: 'supplier',  nullable: true })
  customer: any | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}