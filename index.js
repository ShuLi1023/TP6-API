import app from './app'

const port = 8081

app.listen(port, () => {
    console.log("Server listening on port " + port + "...")
})