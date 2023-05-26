import { useEffect, useState } from "react"
import { Data } from "../Pages/Shared/DataFromBackend/DataFromBackend"

const useMenu = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`${Data}/menu`)
            .then(res => res.json())
            .then(data => {
                setMenu(data)
                setLoading(false)
            })
    }, [])
    return [menu, loading]
}

export default useMenu;