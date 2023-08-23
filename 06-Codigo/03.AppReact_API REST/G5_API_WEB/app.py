from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util
import json
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

client = MongoClient('mongodb+srv://rmrivera:freeforever2021@learningcluster.5ye61vd.mongodb.net/')

#client = MongoClient('mongodb://localhost:27017/administrador')
db = client['administrador']
collection = db['products']

from bson import json_util

# Obtener todos los productos
@app.route('/productos', methods=['GET'])
def obtener_productos():
    productos = collection.find()
    productos_json = []
    for producto in productos:
        producto['_id'] = str(producto['_id'])
        productos_json.append(producto)
    return jsonify(json.loads(json_util.dumps(productos_json)))

# Obtener un producto por su ID
@app.route('/productos/<string:id>', methods=['GET'])
def obtener_producto(id):
    producto = collection.find_one({'_id': ObjectId(id)})
    if producto:
        producto['_id'] = str(producto['_id'])
        return jsonify(producto)
    else:
        return jsonify({'mensaje': 'Producto no encontrado'}), 404

# Crear un nuevo producto
@app.route('/productos', methods=['POST'])
def crear_producto():
    nuevo_producto = request.get_json()
    result = collection.insert_one(nuevo_producto)
    nuevo_producto['_id'] = str(result.inserted_id)
    return jsonify(json.loads(json_util.dumps(nuevo_producto))), 201

# Actualizar un producto existente
@app.route('/productos/<string:id>', methods=['PUT'])
def actualizar_producto(id):
    producto_actualizado = request.get_json()
    result = collection.update_one({'_id': ObjectId(id)}, {'$set': producto_actualizado})
    if result.modified_count > 0:
        producto_actualizado['_id'] = id
        return jsonify(producto_actualizado)
    else:
        return jsonify({'mensaje': 'Producto no encontrado'}), 404

# Eliminar un producto
@app.route('/productos/<string:id>', methods=['DELETE'])
def eliminar_producto(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'mensaje': 'Producto eliminado'})
    else:
        return jsonify({'mensaje': 'Producto no encontrado'}), 404

@app.route('/producto_total/<string:producto_id>', methods=['GET'])
def obtener_producto_total(producto_id):
    producto = collection.find_one({'_id': ObjectId(producto_id)})
    if producto:
        total = producto['cantidad'] * producto['precio']
        producto['TOTAL'] = total
        return jsonify(json.loads(json_util.dumps(producto)))
    else:
        return jsonify({'message': 'Producto no encontrado'}), 404

@app.route('/producto_IVA/<string:producto_id>', methods=['GET'])
def obtener_producto_iva(producto_id):
    producto = collection.find_one({'_id': ObjectId(producto_id)})
    if producto:
        subtotal = producto['cantidad'] * producto['precio']
        iva = subtotal * 0.12
        producto['IVA'] = iva
        return jsonify(json.loads(json_util.dumps(producto)))
    else:
        return jsonify({'message': 'Producto no encontrado'}), 404

@app.route('/producto_DESC/<string:producto_id>', methods=['GET'])
def obtener_producto_desc(producto_id):
    producto = collection.find_one({'_id': ObjectId(producto_id)})
    if producto:
        subtotal = producto['cantidad'] * producto['precio']
        desc = subtotal * 0.10
        producto['Descuento'] = desc
        return jsonify(json.loads(json_util.dumps(producto)))
    else:
        return jsonify({'message': 'Producto no encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
