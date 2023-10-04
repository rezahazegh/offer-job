import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IOffer } from '../interface/offer.interface';

@Entity('offers')
export class Offer implements IOffer {
  constructor(offer?: IOffer) {
    Object.assign(this, offer);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  @Column({ type: 'smallint', default: 0, name: 'is_desktop' })
  isDesktop: number;

  @Column({ type: 'smallint', default: 0, name: 'is_android' })
  isAndroid: number;

  @Column({ type: 'smallint', default: 0, name: 'is_ios' })
  isIos: number;

  @Column({ type: 'varchar', length: 256, name: 'offer_url_template' })
  offerUrlTemplate: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'provider_name',
  })
  providerName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'external_offer_id',
    nullable: true,
  })
  externalOfferId: string;
}
