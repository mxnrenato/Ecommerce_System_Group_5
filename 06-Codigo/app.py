from bson import ObjectId
from pymongo import MongoClient
from flask import Flask, render_template, request, redirect, jsonify


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/administrador')
db = client['administrador']
collection = db['products']

app = Flask(__name__)

@app.route('/')
def index():
    productos = list(collection.find())
    products = collection.find()  # Obtener todos los documentos de la colección 'products'
    return render_template('index.html', products=products)

@app.route('/add_product', methods=['POST'])
def add_product():
    nombre = request.form['nombre']
    codigo = request.form['codigo']
    precio = float(request.form['precio'])
    cantidad = int(request.form['cantidad'])
    vendedor = request.form['vendedor']

    if precio < 0 or precio > 25:
        return "El precio debe estar entre 0 y 25"

    product_data = {
        'nombre': nombre,
        'codigo': codigo,
        'precio': precio,
        'cantidad': cantidad,
        'vendedor': vendedor
    }

    collection.insert_one(product_data)

    return redirect('/')

# ...

@app.route('/edit_product/<string:id>', methods=['GET', 'POST'])
def edit_product(id):
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.form['nombre']
        codigo = request.form['codigo']
        precio = float(request.form['precio'])
        cantidad = request.form['cantidad']
        vendedor = request.form['vendedor']

        if precio < 0 or precio > 25:
            return "El precio debe estar entre 0 y 25"
        
        # Actualizar el registro en la base de datos
        collection.update_one({'_id': ObjectId(id)}, {'$set': {
            'nombre': nombre,
            'codigo': codigo,
            'precio': precio,
            'cantidad': cantidad,
            'vendedor': vendedor
        }})

        # Redireccionar a la página de listado de productos
        return index()

    else:
        # Obtener el producto a modificar
        product = collection.find_one({'_id': ObjectId(id)})

        # Renderizar el formulario de modificación con los datos del producto
        return render_template('edit.html', product=product)

# ...

@app.route('/delete_product/<string:id>', methods=['POST'])
def delete_product(id):
    # Eliminar el producto de la base de datos
    collection.delete_one({'_id': ObjectId(id)})
    
    # Redireccionar a la página de listado de productos
    return redirect('/')

# ...

if __name__ == '__main__':
    app.run()
