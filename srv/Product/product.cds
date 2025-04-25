using {db.product as product} from '../../db';

service ProductService @(impl: './routes/product.routes.js') {
    entity Products as projection on product.Product;
    function groupByCategory() returns array of Products;
}
