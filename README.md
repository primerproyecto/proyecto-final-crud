# proyecto-final-crud
Ejercicio final del bootcamp.
Proyecto final de un crud de una tienda online con las siguientes librerías de javascript.
- Expressjs, jsonwebtoken, cloudinary, bcrypt, nodemailer y multer.
- Mongodb para el almacenamiento en la nube. 
- React. Para gestionar el frontal de la aplicación.



## Logica de negocio.

### Gestión de catálogo

Un usuario con rol de admin podrá agregar productos al catálogo de productos que es una colección de items que pueden comprarse en la aplicación.

Asímimo podrá actualizar cualquier dato de los productos a través de la aplicación una vez loginneado.

Este mismo perfil es el que se encargará de poder eliminar los productos del catálogo.

El catálogo de productos, creado por el rol "admin", podrá ser visualizado en la página incial de la aplicación así como en la página de detalle del producto por cualquier visitante que acceda al dominio de puestan en producción.

Los productos podrán ser filtrados por categoría y hacer búsquedas por el campo ```title``` y por el campo ```descripción```.

Si está registrado y logineado, podrá agregarlo al carrito que representa la colección de items que el usuario ha añadido. También podrá quitarlos del carrito a través de la misma aplicación.
En este carrito se llevará la cuenta del numero de items de cada producto que han sido añadidos.



### Gestión de usuario

Habrá 3 tipos de usuarios en nuestra aplicación.

- Los ***anónimos***.
- Los usuarios que tengan ***rol de user*** en el registro.
- Los ususrios que tengan ***rol de admin*** en el registro.


Para identificarse en la aplicación deberán de haber completado el proceso de registro y

Los usuarios accederán o harán login a través del ***email*** que hayan establecido en el registro y la ***contraseña*** desde la página de login.
También se facilitará la recuperación de la contraseña si ya se han registrado y han olvidado la misma. Se les facilitará al correo que hayan utilizado en el registro otra contraseña.







## Back

### Configuración del package.json

```
"dependencies": {
    "bcrypt": "^5.1.0",
    "cloudinary": "^1.37.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.1.1",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "nodemailer": "^6.9.2",
    "validator": "^13.9.0"
  },
```

### Modelos

#### Modelo usuario

En la aplicación habrá 3 tipos de usuarios:
- usuarios **anónimos**, que son los que no se han registrado en la apliación.
- usurios **regulares** son aquellos que se han registrado con el rol de ***user*** en la aplicación.
- usuarios **administrador**. Aquellos que se han registrador con el rol de ***admin***.

```
const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword],
      minlength: [8, 'Min 8 characters'],
    },
    rol: { type: String, enum: ['admin', 'user'], required: true },
    image: { type: String },
    confirmationCode: { type: Number, required: true },
    check: { type: Boolean, default: false },
    carrito: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);
```
#### Modelo carrito

```
const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        cantidad: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: false,
  }
);
```
#### Modelo producto

```
const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String },
    categories: { type: String, enum: ['Electrónico', 'Complementos'] },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true, min: 10 },
    destacado: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
```



### ENDPOINTS

#### Endpoints de usuario

```
UserRoutes.post('/register', upload.single('image'), register);
UserRoutes.post('/check', checkNewUser);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/login', login);
UserRoutes.post('/forgotpassword', forgotPassword);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('image'), update);

UserRoutes.delete('/', [isAuth], deleteUser);
UserRoutes.get('/', allUsers);

UserRoutes.post('/forgotpassword/sendPassword/:id', sendPassword);
```


#### Endpoints de producto

```
ProductRoutes.get("/getAllProducts", getAllProducts);
ProductRoutes.get("/:id", getOneProduct);
ProductRoutes.post("/new", upload.single("image"), postOneProduct);
ProductRoutes.patch(
  "/:id",
  upload.single("image"),
  isAuthAdmin,
  updateOneProduct
);
ProductRoutes.delete("/:id", isAuthAdmin, deleteOneProduct);
```


#### Endpoints del carrito

````
CartRoutes.post('/agregar', isAuth, createCarrito);
CartRoutes.delete('/:id', isAuthAdmin, borrarCarrito);
CartRoutes.get('/:id', isAuth, todoMiCarrito);
CartRoutes.post('/:carritoId', isAuth, agregarProductoAlCarrito);
CartRoutes.patch('/:carritoId', isAuth, quitarProductoDelCarrito);

CartRoutes.get('/', todosLosCarritos);
````



