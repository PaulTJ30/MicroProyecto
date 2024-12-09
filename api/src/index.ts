import app from "./app";
import mongoose from "mongoose"




async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/Aplicacion"
        );
        console.log("Aplicacion conectada a la base de datos")
        app.listen(4000, () => {
            console.log("Aplicacion correidno con exito")
        })
    } catch (error) {
        console.log("Algo salio mas con la base de datos")
    }

}
main();