from flask import Flask, render_template,url_for

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("cliente/index.html")
@app.route("/carrito")
def products():
    return render_template("cliente/cart.html")
@app.route("/login")
def login():
    return render_template("cliente/login.html")

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")


