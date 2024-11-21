from flask import Flask, render_template, url_for

app = Flask(__name__)

# Ruta para la página principal
@app.route("/")
def index():
    return render_template("cliente/index.html")

# Ruta para el carrito
@app.route("/carrito")
def products():
    return render_template("cliente/cart.html")

# Ruta para el inicio de sesión
@app.route("/login")
def login():
    return render_template("cliente/login.html")

# Ruta para el detalle del producto
@app.route("/producto")
def producto():
    return render_template("cliente/producto-detalle.html")

# Ruta para la página de misiones
@app.route("/misiones")
def misiones():
    return render_template("cliente/misiones.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
