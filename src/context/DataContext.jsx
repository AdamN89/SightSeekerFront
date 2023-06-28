import { createContext, useState } from "react"

export const DataContext = createContext()

export default function DataContextProvider({ children }) {
    const avatars = [
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/01_xtix8i.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/02_v1rulc.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/03_h4ptfr.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/04_nfzjs7.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/05_y0j4qs.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/06_x12196.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/07_wduulo.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/08_cbriqj.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/09_dlin3a.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/10_ipwhbm.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/11_l5omrg.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/12_wggivu.jpg"]


    const [ currentChat, setCurrentChat ] = useState(null)
    const [ sendMessage, setSendMessage ] = useState(null)
    const [ receiveMessage, setReceiveMessage ] = useState(null)

    return(
        <DataContext.Provider value={{avatars, currentChat, setCurrentChat, sendMessage, setSendMessage, receiveMessage, setReceiveMessage }}>
            {children}
        </DataContext.Provider>
    )
}