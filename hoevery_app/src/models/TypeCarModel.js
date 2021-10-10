export default class Cars {
  id: integer;
  owner_id: integer;
  carname: string;
  type: string;
  size: string;
  price_daily: string;
  price_weekly: string;
  price_monthly: string;
  _function: string;
  image: string;
  longitude: float;
  latitude: float;

  constructor(
    id = '',
    owner_id = '',
    carname = '',
    type = '',
    size = '',
    price_daily = '',
    price_weekly = '',
    price_monthly = '',
    _function = '',
    image = '',
    longitude = '',
    latitude = '',
    
  ) {
    this.id = id;
    this.owner_id = owner_id;
    this.carname = carname;
    this.type = type;
    this.size = size;
    this.price_daily = price_daily;
    this.price_weekly = price_weekly;
    this.price_monthly = price_monthly;
    this._function = _function;
    this.image = image;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
