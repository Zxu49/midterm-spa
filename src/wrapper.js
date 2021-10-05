import React from "react"
import "./App.css"
import App from "./App"
import Create from "./components/create"

export default function Warpper() {
    var url = window.location.href
    var hasToken = url.includes("id_token")
    
    const f = new URLSearchParams(window.location.hash.substr(1))
    var idToken = f.get('id_token')
    var storage = window.localStorage
    storage.setItem("idToken", idToken)

    if (!hasToken) {
        console.log(idToken)
        return <App />
    } else {
        console.log(idToken)
        return <Create />
    }
}