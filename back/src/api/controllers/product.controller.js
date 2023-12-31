const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const setError = require("../../helpers/handle-error");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");
// const { Carrito } = require("../../../../front/src/pages/Carrito");

// RECIBIR TODOS LOS PRODUCTOS DEL CATALOGO Y TAMBIÉN FILTRA POR CATEGORIA SI SE LE PASA QUERY
const getAllProducts = async (req, res, next) => {
  const categoria = req.query.categoria;
  let allProducts = [];
  try {
    if (categoria) {
      allProducts = await Product.find({
        categories: {
          $in: [categoria],
        },
      });
    } else {
      allProducts = await Product.find();
    }
    if (allProducts) {
      return res.status(200).json(allProducts);
    } else {
      return res.status(200).json("No hay");
    }
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || "No hay conexión con base de datos"
      )
    );
  }
};

// RECIBIR UN UNICO PRODUCTO
const getOneProduct = async (req, res, next) => {
  try {
    const productoSolicitado = await Product.findById(req.params.id);
    return res.status(200).json(productoSolicitado);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || "No hay conexión con base de datos"
      )
    );
  }
};
// AGREGAR UN PRODUCTO AL CATALOGO DE PRODUCTOS
const postOneProduct = async (req, res, next) => {
  try {
    let catchImg = req.file?.path;

    // COMPROBAMOS QUE NO HAYA OTRO PRODUCTO CON EL MISMO TÍTULO. Preguntar a Pedro

    const estaYaenCatalogo = await Product.find({ title: req.body.title });
    if (estaYaenCatalogo.length > 1) {
    } else {
      const nuevoProducto = new Product(req.body);

      if (req.file) {
        nuevoProducto.image = req.file.path;
      } else {
        nuevoProducto.image =
          "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      try {
        const guardadoProducto = await nuevoProducto.save();
        if (guardadoProducto === null) {
          deleteImgCloudinary(catchImg);
        }
        res.status(200).json(guardadoProducto);
      } catch (error) {
        res.json("el producto ya está en el catálogo");
      }
    }
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || "No hay conexión con base de datos"
      )
    );
  }
};

//ACTUALIZAR PRODUCTO
const updateOneProduct = async (req, res, next) => {
  let catchImg = req.file?.path;

  const todo = { ...req.body, image: catchImg };

  try {
    // actualizamos los indexes de los elementos unicos por si han modificado
    await Product.syncIndexes();
    // instanciamos un nuevo modelo de user
    const patchProduct = new Product(req.body);

    // si tenemos la req.file le metemos el path de cloudinary
    if (req.file) {
      patchProduct.image = req.file.path;
    }

    try {
      await Product.findByIdAndUpdate(req.params.id, todo, { new: true });
      if (req.file) {
        deleteImgCloudinary(req.user.image);
      }
      //! ----------------test  runtime ----------------
      // buscamos el usuario actualizado
      const updateProduct = await Product.findById(req.params.id);

      // cogemos la keys del body
      const updateKeys = Object.keys(req.body);

      // creamos una variable para  guardar los test
      const testUpdate = [];
      // recorremos las keys y comparamos
      updateKeys.forEach((item) => {
        if (updateProduct[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updateProduct.image == req.file.path
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }
      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return next(error);
    }

    res.status(200);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || "No hay conexión con base de datos"
      )
    );
  }
};

//BORRAR PRODUCTOS
const deleteOneProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    await Cart.updateMany(
      {'products.productId': req.params.id},
      {$pull: {products: {productId: req.params.id}}}
      );
      // if (await Product.findById(req.params.id)) {
      //   return res.status(404).json("Dont delete");
      // } else {
      //   deleteImgCloudinary(req.user.image);
      //   return res.status(200).json("ok delete");
      // }
    res.status(200).json("Producto borrado");
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || "No hay conexión con base de datos"
      )
    );
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
