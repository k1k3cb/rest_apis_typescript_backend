import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailable,
  updateProduct
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor curvo de 24 pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 300
 *         available:
 *           type: boolean
 *           description: The availability of the product
 *           example: true
 *
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of all the products
 *     tags:
 *       - Products
 *     description: Returns the list of all the products
 *     responses:
 *          200:
 *            description: Successful response
 *            content:
 *              aplication/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 *
 */

router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags:
 *       - Products
 *     description: Returns a product based on the
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *          200:
 *            description: Successful response
 *            content:
 *              aplication/json:
 *                schema:
 *                    $ref: '#/components/schemas/Product'
 *
 *          404:
 *            description: Product not found
 *
 *          400:
 *            description: Bad request - invalid ID
 *
 */
router.get(
  '/:id',

  //Validación
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *      required: true
 *      content:
 *        aplication/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor curvo de 24 pulgadas
 *              price:
 *                type: number
 *                example: 300
 *
 *     responses:
 *        201:
 *          description: Successful response  
 *          content:
 *            aplication/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'     
 *
 *        400:
 *          description: Bad request - invalid input data
 *
 */

router.post(
  '/',

  //Validación
  body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),

  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .custom(value => value > 0)
    .withMessage('Precio no válido'),
  handleInputErrors,
  createProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user data
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product
 *       required: true
 *       schema:
 *         type: integer
 * 
 *     requestBody:
 *       required: true
 *       content:
 *        aplication/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor curvo de 24 pulgadas
 *              price:
 *                type: number
 *                example: 300
 *              available:
 *                type: boolean
 *                example: true
 *
 *     responses:
 *        200:
 *          description: Successful response  
 *          content:
 *            aplication/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'       
 *       
 *
 *        400:
 *          description: Bad request - invalid ID or invalid input data
 * 
 *        404:
 *          description: Product not found
 *
 */

router.put(
  '/:id',

  //Validación
  param('id').isInt().withMessage('ID no válido'),
  body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),

  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .custom(value => value > 0)
    .withMessage('Precio no válido'),
  body('available').isBoolean().withMessage('Valor para disponible no válido'),
  handleInputErrors,

  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product
 *       required: true
 *       schema:
 *         type: integer
 *
 *     responses:
 *        200:
 *          description: Successful response  
 *          content:
 *            aplication/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'       
 *       
 *
 *        400:
 *          description: Bad request - invalid ID 
 * 
 *        404:
 *          description: Product not found
 *
 */



router.patch(
  '/:id',

  //Validación
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,

  updateAvailable
);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product by a given ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product to delete
 *       required: true
 *       schema:
 *         type: integer
 *
 *     responses:
 *        200:
 *          description: Successful response  
 *          content:
 *            aplication/json:
 *              schema:
 *                type: string
 *                value: "Product deleted"              
 *       
 *        400:
 *          description: Bad request - invalid ID 
 * 
 *        404:
 *          description: Product not found
 *
 */

router.delete(
  '/:id',

  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,

  deleteProduct
);

export default router;
