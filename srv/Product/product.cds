using {db.product as product} from '../../db';

service ProductService {
    entity Products as projection on product.Product;
}
